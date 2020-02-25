const express = require('express');
const app = express();
const Client = require('../models').Client;
const hl7 = require('simple-hl7');

module.exports = {
    // List all clients in the system
    all(req, res) {
        // Define the page that loads paginated answers
        const page = req.query.page || 1;
        const limit = 10;
        const offset = 10;
        Client.findAndCountAll({
            limit: limit,
            offset: (page - 1) * offset,
            order: [['id', 'ASC']],
            // where: { status: 0 },
        })
        .then(clients => res.render('clients', {
            "clients": clients.rows,
            "pagesCount": Math.ceil(clients.count/limit),
            "currentPage": page,
        }))
        .catch(error => res.status(400).send(error));
    },

    // Search for a specific client using UUID, for Primary key utumie findByPk(req.params.ClientId)
    details(req, res) {
        // Client.findOne({where: {id: req.params.ClientId} })
        Client.findByPk(req.params.ClientId)
        .then(client => res.render("client", {"client": client}))
        .catch(error => res.status(400).send(error));
    },

    // Push the message to a HL7 source
    push(req, res) {
        var client = Client.findByPk(req.params.ClientId);
        client.then(function (client) {
            var message = hl7.Server.createTcpClient('localhost', 60920);
            // create a message
            var pid = new hl7.Message(
                    "Manyara RRH",
                    "AfyaCare EMR",
                    "NHCR",
                    "MOH",
                    Date.now(),
                    "",
                    ["ADT", "A08", "ADT_A08"],
                    "7",
                    "P",
                    "2.3.1",
                );
                pid.addSegment(
                    "EVN",
                    "",
                    Math.floor(Date.now()),
                );
                pid.addSegment(
                    "PID",
                    "",
                    "",
                    [
                        client.ctc_id,
                        "",
                        "",
                        "Manyara RRH Afyacare",
                        "",
                        "MRRH OPD",
                        "",
                        client.lastname,
                        client.firstname,
                        client.middlename,
                        "",
                        "",
                        "",
                        "L",
                    ],
                    "",
                    client.date_of_birth,
                    client.sex,
                    [
                        "",
                        "",
                    ],
                    "",
                    [
                        client.hamlet,
                        client.council + "*" +client.ward + "*" + client.village,
                        client.council,
                        client.region,
                        "",
                        "",
                        "H~" + client.hamlet,
                        client.council + "*" +client.ward + "*" + client.village,
                        client.council,
                        client.region,
                        "",
                        "",
                        "C~" + client.hamlet,
                        client.council + "*" +client.ward + "*" + client.village,
                        client.council,
                        client.region,
                        "",
                        "",
                        "BR",
                    ],
                    "",
                    [
                        "", "PRN", "", "PH", "", "", client.phone, client.phone,
                    ],
                    "",
                    "",
                    "",
                    "",
                    client.unified_lifetime_number,
                    client.driver_license_id,
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    client.national_id,
                );
            pid.addSegment(
                "PV1",
                "",
                " ",
            );
            pid.addSegment(
                "IN1",
                "",
                client.nhif_id,
                "",
                "NHIF",
            );
            pid.addSegment(
                "ZXT",
                client.voter_id,
                [
                    client.birth_certificate_entry_number,
                    "TZA",
                    "BTH_CRT",
                    "",
                    "Tanzania",
                ],
                "",
                "",
            );

                var parser = new hl7.Parser();

                var msg = parser.parse(pid.toString());

                console.log('******sending message******')
                message.send(msg, function(err, ack) {
                    console.log('******ack received******')
                    console.log(ack.log())
                    console.log('******updating client status******')
                    var update = Client.update({status: 1}, {where: {id: req.params.ClientId}})
                        .then(
                            update => res.render("client", {"client": client}),
                            )
                })
        })
    },
    // Push all the clients to a HL7 source
    pushAll(req, _res) {
        
    },

};