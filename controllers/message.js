const express = require('express');
const app = express();
const Client = require('../models').Client;

const net = require('net');
const VT = String.fromCharCode(0x0b);
const FS = String.fromCharCode(0x1c);
const CR = String.fromCharCode(0x0d);
// const remoteOptions = {host: '154.72.82.199', port: 2200};
const remoteOptions = {host: '127.0.0.1', port: 60920};

module.exports = {
    push(req, res) {
        var client = Client.findOne({where: {uuid: req.params.ClientUuid}, logging: false });
        client.then(function(client) {
            // MSH Variables
            var p = "|";
            var h = "^";
            var n = "\r\n"
            var MSHheader = "MSH|^~\\&";
            var SendingApplication = "CTC";
            var SendingFacility = "HIM";
            var ReceivingApplication = "NHCR";
            var ReceivingFacility = "NHCR";
            var Timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
            var ColonTimestamp = Timestamp.replace(/-|\s/g,"")
            var MessageTimestamp = ColonTimestamp.replace(/:/g,"");
            var MSHsuffix = "ADT^A01^ADT_A01|8|P|2.3.1";

            // EVN Variables
            var EVNheader = "EVN";

            // PID Variables
            var PIDheader = "PID";
            var NewProgramID = client.ctc_id;
            var AuthApp = "CTC";
            var EncounterLoc = 100175;
            var LName = client.lastname;
            var FName = client.firstname;
            var MName = client.middlename;
            var OName = client.othername;
            var allDob = client.dob;
            var colonDob = allDob.replace(/-|\s/g,"");
            var DoB = colonDob.replace(/:/g,"").substr(0, 8);
            var Gender = client.sex = 'Female' ? 'F' :'M';
            var PermHamlet = client.hamlet;
            var PermCouncil = client.council;
            var PermWard = client.ward;
            var PermVillage = client.village;
            var PermDistrict = client.council;
            var PermRegion = client.region;
            var ResdHamlet = client.hamlet;
            var ResdCouncil = client.council;
            var ResdWard = client.ward;
            var ResdVillage = client.village;
            var ResdDistrict = client.council;
            var ResdRegion = client.region;
            var BirthHamlet = client.hamlet;
            var BirthCouncil = client.council;
            var BirthWard = client.ward;
            var BirthVillage = client.village;
            var BirthDistrict = client.council;
            var BirthRegion = client.region;
            var MobilePrefix = client.phone_prefix;
            var MobileSuffix = client.phone_suffix;
            var ULNumber = client.uln;
            var DLicense = client.dl_id;
            var NationalID = client.national_id;
            
            // PV headers
            var PVheader = "PV1";

            // IN headers
            var INheader = "IN1";
            var InsuranceID = client.nhif_id;
            var InsuranceType = "NHIF";

            // Z Headers
            var Zheader = "ZXT";
            var VotersID = client.voter_id;
            var BirthCert = client.birth_certificate_entry_number;
            var CountryCode = "TZA";
            var CountryName = "Tanzania";
            
            // Create the message to be sent to the NHCR
            // +Zheader+p+VotersID+BirthCert+h+CountryCode+h+"BTH_CRT"+h+h+CountryName+p+p+p+"\r\n"
            const message = 
                MSHheader+p+SendingApplication+p+SendingFacility+p+ReceivingApplication+p+ReceivingFacility+p+MessageTimestamp+p+p+MSHsuffix+"\r\n"+
                EVNheader+p+p+MessageTimestamp+"\r\n"+
                PIDheader+p+p+p+NewProgramID+h+h+h+AuthApp+h+h+EncounterLoc+p+p+LName+h+FName+h+MName+h+h+h+h+"L"+p+p+DoB+p+Gender+p+h+OName+p+p+PermHamlet+h+PermCouncil+"*"+PermWard+"*"+PermVillage+h+PermDistrict+h+PermRegion+h+h+h+"H~"+ResdHamlet+h+ResdCouncil+"*"+ResdWard+"*"+ResdVillage+h+ResdDistrict+h+ResdRegion+h+h+h+"C~"+BirthHamlet+h+BirthCouncil+"*"+BirthWard+"*"+BirthVillage+h+BirthDistrict+h+BirthRegion+h+h+h+"BR||^PRN^PH^^^^"+MobilePrefix+MobileSuffix+p+p+p+p+p+p+ULNumber+p+DLicense+p+p+p+p+p+p+p+p+NationalID+"\r\n"+
                PVheader+p+p+'I'+"\r\n"+
                INheader+p+p+InsuranceID+p+p+InsuranceType+"\r\n"
            ;

            // Send the client to NHCR using events
            const page = req.query.page || 2;
            const limit = 10;
            const offset = 10;
            const remote = net.createConnection(remoteOptions, () => {
                reqdata = VT + message.replace(/ /g,"") + FS + CR
                console.log(`${new Date()}`);
                console.log('Connected to HL7 server!');
                // console.log(reqdata);
                remote.write(new Buffer.from(reqdata, encoding = "utf8"));
            });
            remote.on('data', (data) => {
                var ansData = data.toString();
                console.log(`${new Date()} HL7 answer data: ${ansData}`);
                remote.end();
            });
            remote.on('error', (err) => {
                var reqerror = `${new Date()} Problem with request: ${err.message}`;
                console.error(reqerror);
                remote.end();
                console.log(`${new Date()} Disconnected from HL7 server`);
            });
            remote.on('end', async () => {
                console.log(`${new Date()} Disconnected from HL7 server`);
                console.log('******Updating client status******')
                await Client.update({status: 1}, {where: {uuid: req.params.ClientUuid}, logging: false})
                    .then(
                        // Define the page that loads paginated answers
                        Client.findAndCountAll({
                            limit: limit,
                            offset: (page - 1) * offset,
                            order: [['id', 'ASC']],
                            logging: false
                            // where: { status: 0 },
                        })
                        .then(res.redirect('/clients?page='+page))
                    )
                })
        })
    },

    pushAll(req, res) {
        clients = Client.findAll({where: { status: 0 }})
        .then( clients => {
            clients.forEach(client => {
                // MSH Variables
                var p = "|";
                var h = "^";
                var n = "\r\n"
                var MSHheader = "MSH|^~\\&";
                var SendingApplication = "CTC";
                var SendingFacility = "HIM";
                var ReceivingApplication = "NHCR";
                var ReceivingFacility = "NHCR";
                var Timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
                var ColonTimestamp = Timestamp.replace(/-|\s/g,"")
                var MessageTimestamp = ColonTimestamp.replace(/:/g,"");
                var MSHsuffix = "ADT^A01^ADT_A01|8|P|2.3.1";

                // EVN Variables
                var EVNheader = "EVN";

                // PID Variables
                var PIDheader = "PID";
                var NewProgramID = client.ctc_id;
                var AuthApp = "CTC";
                var EncounterLoc = 100175;
                var LName = client.lastname;
                var FName = client.firstname;
                var MName = client.middlename;
                var OName = client.othername;
                var allDob = client.dob;
                var colonDob = allDob.replace(/-|\s/g,"");
                var DoB = colonDob.replace(/:/g,"").substr(0, 8);
                var Gender = client.sex = 'Female' ? 'F' :'M';
                var PermHamlet = client.hamlet;
                var PermCouncil = client.council;
                var PermWard = client.ward;
                var PermVillage = client.village;
                var PermDistrict = client.council;
                var PermRegion = client.region;
                var ResdHamlet = client.hamlet;
                var ResdCouncil = client.council;
                var ResdWard = client.ward;
                var ResdVillage = client.village;
                var ResdDistrict = client.council;
                var ResdRegion = client.region;
                var BirthHamlet = client.hamlet;
                var BirthCouncil = client.council;
                var BirthWard = client.ward;
                var BirthVillage = client.village;
                var BirthDistrict = client.council;
                var BirthRegion = client.region;
                var MobilePrefix = client.phone_prefix;
                var MobileSuffix = client.phone_suffix;
                var ULNumber = client.uln;
                var DLicense = client.dl_id;
                var NationalID = client.national_id;
                
                // PV headers
                var PVheader = "PV1";

                // IN headers
                var INheader = "IN1";
                var InsuranceID = client.nhif_id;
                var InsuranceType = "NHIF";

                // Z Headers
                var Zheader = "ZXT";
                var VotersID = client.voter_id;
                var BirthCert = client.birth_certificate_entry_number;
                var CountryCode = "TZA";
                var CountryName = "Tanzania";
                
                // Create the message to be sent to the NHCR
                // +Zheader+p+VotersID+BirthCert+h+CountryCode+h+"BTH_CRT"+h+h+CountryName+p+p+p+"\r\n"
                const message = 
                    MSHheader+p+SendingApplication+p+SendingFacility+p+ReceivingApplication+p+ReceivingFacility+p+MessageTimestamp+p+p+MSHsuffix+"\r\n"+
                    EVNheader+p+p+MessageTimestamp+"\r\n"+
                    PIDheader+p+p+p+NewProgramID+h+h+h+AuthApp+h+h+EncounterLoc+p+p+LName+h+FName+h+MName+h+h+h+h+"L"+p+p+DoB+p+Gender+p+h+OName+p+p+PermHamlet+h+PermCouncil+"*"+PermWard+"*"+PermVillage+h+PermDistrict+h+PermRegion+h+h+h+"H~"+ResdHamlet+h+ResdCouncil+"*"+ResdWard+"*"+ResdVillage+h+ResdDistrict+h+ResdRegion+h+h+h+"C~"+BirthHamlet+h+BirthCouncil+"*"+BirthWard+"*"+BirthVillage+h+BirthDistrict+h+BirthRegion+h+h+h+"BR||^PRN^PH^^^^"+MobilePrefix+MobileSuffix+p+p+p+p+p+p+ULNumber+p+DLicense+p+p+p+p+p+p+p+p+NationalID+"\r\n"+
                    PVheader+p+p+'I'+"\r\n"+
                    INheader+p+p+InsuranceID+p+p+InsuranceType+"\r\n"
                ;

                // Send the client to NHCR using events
                var page = req.query.page || 2;
                var limit = 10;
                var offset = 10;
                var remote = net.createConnection(remoteOptions, () => {
                    reqdata = VT + message.replace(/ /g,"") + FS + CR
                    console.log(`${new Date()}`);
                    console.log('Connected to HL7 server!');
                    // console.log(reqdata);
                    remote.write(new Buffer.from(reqdata, encoding = "utf8"));
                });
                remote.on('data', (data) => {
                    var ansData = data.toString();
                    console.log(`${new Date()} HL7 answer data: ${ansData}`);
                    remote.end();
                });
                remote.on('error', (err) => {
                    var reqerror = `${new Date()} Problem with request: ${err.message}`;
                    console.error(reqerror);
                    remote.end();
                    console.log(`${new Date()} Disconnected from HL7 server`);
                });
                remote.on('end', ()  => {
                    console.log(`${new Date()} Disconnected from HL7 server`);
                    console.log('******Updating client status******');
                    var patient = Client.update({status: 1}, {where: {uuid: client.uuid}})
                });                 
            })
            // @TODO Move this THEN to a relevant location in the document
            .then(res.redirect('/clients?page='+page))
        })
        console.log('Here');
    },
}