const express = require('express');
const app = express();
const Client = require('../models').Client;

const net = require('net');
// const VT = String.fromCharCode(0x0b);
// const FS = String.fromCharCode(0x1c);
// const CR = String.fromCharCode(0x0d);
// const remoteOptions = {host: '127.0.0.1', port: 60920};
const VT = "\013";
const FS = "\034";
const CR = "\015";
const remoteOptions = {host: '154.72.82.199', port: 2200};

module.exports = {
    push(req, res) {
        var client = Client.findByPk(req.params.ClientId);
        client.then(function(client) {
            // MSH Variables
            var p = `|`;
            var h = `^`;
            var n = `\n`
            var MSHheader = `MSH|^~\\&`;
            var SendingApplication = `AfyaCare`;
            var SendingFacility = `manyara RRH`;
            var ReceivingApplication = `NHCR`;
            var ReceivingFacility = `MOH`;
            var MessageTimestamp = Date.now();
            var MSHsuffix = `ADT^A01^ADT_A01|4|P|2.3.1`;

            // EVN Variables
            var EVNheader = `EVN`;

            // PID Variables
            var PIDheader = `PID`;
            var NewProgramID = `CTC2020120109098`;
            var AuthApp = `CTC2`;
            var EncounterLoc = `Dongobesh Health Center`;
            var LName = client.lastname;
            var FName = client.firstname;
            var MName = client.middlename;
            var DoB = client.date_of_birth;
            var Gender = client.sex;
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
            var MobilePrefix = client.phone_number;
            var MobileSuffix = client.phone_number;
            var ULNumber = client.unified_lifetime_number;
            var DLicense = client.driver_license_id;
            var NationalID = client.national_id;
            
            // PV headers
            var PVheader = `PV1`;

            // IN headers
            var INheader = `IN1`;
            var InsuranceID = ``;
            var InsuranceType = `NHIF`;

            // Z Headers
            var Zheader = `ZXT`;
            var VotersID = client.voter_id;
            var BirthCert = client.birth_certificate_entry_number;
            var CountryCode = `TZA`;
            var CountryName = `Tanzania`;

            const message = 
                MSHheader+p+SendingApplication+p+SendingFacility+p+ReceivingApplication+p+ReceivingFacility+p+MessageTimestamp+p+p+MSHsuffix+`\n`+
                EVNheader+p+MessageTimestamp+`\n`+
                PIDheader+p+p+p+NewProgramID+h+h+h+AuthApp+h+h+EncounterLoc+p+p+LName+h+FName+h+MName+h+h+h+h+`L`+p+p+DoB+p+Gender+p+p+p+p+`\n`+
                    PermHamlet+`/ `+h+PermCouncil+`*`+PermWard+`*`+PermVillage+h+PermDistrict+h+PermRegion+h+h+h+`H~`+`\n`+
                    ResdHamlet+`/ `+h+ResdCouncil+`*`+ResdWard+`*`+ResdVillage+h+ResdDistrict+h+ResdRegion+h+h+h+`C~`+`\n`+
                    BirthHamlet+`/ `+h+BirthCouncil+`*`+BirthWard+`*`+BirthVillage+h+BirthDistrict+h+BirthRegion+h+h+h+`BR||^PRN^PH^^^`+`\n`+
                    MobilePrefix+h+MobileSuffix+p+p+p+p+p+p+ULNumber+p+DLicense+p+p+p+p+p+p+p+p+NationalID+`\n`+
                PVheader+p+p+p+`\n`+
                INheader+p+p+InsuranceID+p+p+InsuranceType+`\n`+
                Zheader+p+VotersID+BirthCert+CountryCode+h+`BTH_CRT`+h+h+CountryName+p+p+p
            ;
            const page = req.query.page || 1;
            const limit = 10;
            const offset = 10;
            const remote = net.createConnection(remoteOptions, () => {
                reqdata = VT + message + FS + CR
                console.log(`${new Date()}`);
                console.log('Connected to HL7 server!');
                console.log(reqdata);
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
            remote.on('end', () => {
                console.log(`${new Date()} Disconnected from HL7 server`);
                console.log('******Updating client status******')
                var patient = Client.update({status: 1}, {where: {id: req.params.ClientId}})
                    .then(
                        // Define the page that loads paginated answers
                        Client.findAndCountAll({
                            limit: limit,
                            offset: (page - 1) * offset,
                            order: [['id', 'ASC']],
                            // where: { status: 0 },
                        })
                        .then(clients => res.status(302).render('clients', {
                            "clients": clients.rows,
                            "pagesCount": Math.ceil(clients.count/limit),
                            "currentPage": page,
                        }))
                        .catch(error => res.status(400).send(error)),
                        )
            })
        })
    },
    pushAll() {
        clients = Client.findAll({where: { status: 0 }})
        .then( client => {
            console.log(client.rows)
        })
        // console.log('Here');
    },
}