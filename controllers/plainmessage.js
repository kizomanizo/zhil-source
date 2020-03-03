const express = require('express');
const app = express();
const Client = require('../models').Client;

const net = require('net');
const VT = String.fromCharCode(0x0b);
const FS = String.fromCharCode(0x1c);
const CR = String.fromCharCode(0x0d);
// const VT = 0x0b;
// const FS = 0x1c;
// const CR = 0x0d;
// const remoteOptions = {host: '127.0.0.1', port: 60920};
// const VT = "\013";
// const FS = "\034";
// const CR = "\015";
const remoteOptions = {host: '154.72.82.199', port: 2200};

module.exports = {
    push(req, res) {
        var client = Client.findByPk(req.params.ClientId);
        client.then(function(client) {
            const message = 
                "MSH|^~\\&|CTC|HIM|NHCR|NHCR|20200227143820||ADT^A08^ADT_A08|8|P|2.3.1\r\n"+
                "EVN||20200227143820\r\n"+
                "PID|||1223456d^^^CTC^^100193||Mabusi^Suzan^Test^^^^L||19800101|F|^SuMa||H1^C1*W1*V1^D1^R1^^^H~H2^C2*W2*V2^D2^R2^^^C~H3^C3*W3*V3^D3^R3^^^BR||^PRN^PH^^^^12312312313|||||||||||||||12345678-12345-12345-11\r\n"+
                "PV1||I\r\n"+
                "IN1||NHCIF-04||NHIF\r\n"
            ;
            const message2 =
                "MSH|^~\\&|CTC|HIM|NHCR|NHCR|20200227143820||ADT^A01^ADT_A01|8|P|2.3.1\r\n" +
                "EVN||20200227143820\r\n"+
                "PID|||CTC20200303id004^^^CTC^^100173||Ali^Mayay^Tembele^^^^L||19800101|F|^SuMa||H1^C1*W1*V1^D1^R1^^^H~H2^C2*W2*V2^D2^R2^^^C~H3^C3*W3*V3^D3^R3^^^BR||^PRN^PH^^^^12312312313|||||||||||||||12345678-12345-12345-11\r\n"+
                "PV1||I\r\n"+
                "IN1||NHCIF-02||NHIF\r\n"
            ;
            const message3 = 
                "MSH|^~\\&|CTC|HIM|NHCR|NHCR|20200303145100||ADT^A01^ADT_A01|8|P|2.3.1"+
                "EVN||20200302163743"+
                "PID|||8209848992^^^CTC^^100173||Boay^Grace^Baraka^^^^L||20191219|F|^Papaa||Mvumo^BabatiDC*Basodesh*Robayambao^BabatiDC^Arusha^^^H~Mvumo^BabatiDC*Basodesh*Robayambao^BabatiDC^Arusha^^^C~Mvumo^BabatiDC*Basodesh*Robayambao^BabatiDC^Arusha^^^BR||^PRN^PH^^^^0653765650|||||||||||||||47057809-40998-92560-98"+
                "PV1||I"+
                "IN1||NHCIF-02||NHIF" 
            ; 
            const remote = net.createConnection(remoteOptions, () => {
                reqdata = VT + message2 + FS + CR;
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
            })
        })
    },
}