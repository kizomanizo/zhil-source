const express = require('express');
const app = express();
const Client = require('../models').Client;

var hl7 = require('simple-hl7');

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
 
    // Change client's status from beng inactive to being active
    update(req, res) {
        Client.update({status: 1}, {where: {id: req.params.ClientId}})
        .then(client =>  res.status(200).send({
            success: true,
            message: "Status changed to ACTIVE",
            entity: client,
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

    // Delete a specific client using UUID, for Primary key utumie findByPk(req.params.ClientId)
    delete(req, res) {
      Client.findOne({where: {uuid: req.params.ClientUuid} })
      .then(client => { return client.destroy()} )
      .then(client =>  res.status(200).send({
            success: true,
            message: "Client deleted",
            entity: client,
    }))
      .catch(error => res.status(400).send(error));
    },

    // Push the client to a HL7 source
    push(req, res) {
        var patient = Client.findByPk(req.params.ClientId);
        patient.then(function (patient) {
            var client = hl7.Server.createTcpClient('localhost', 60920);
            // create a message
            var adt = new hl7.Message(
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
                adt.addSegment(
                    "EVN",
                    "",
                    Math.floor(Date.now()),
                );
                adt.addSegment(
                    "PID",
                    "",
                    "",
                    [
                        patient.ctc_id,
                        "",
                        "",
                        "Manyara RRH Afyacare",
                        "",
                        "MRRH OPD",
                        "",
                        patient.lastname,
                        patient.firstname,
                        patient.middlename,
                        "",
                        "",
                        "",
                        "L",
                    ],
                    "",
                    patient.date_of_birth,
                    patient.sex,
                    [
                        "",
                        "",
                    ],
                    "",
                    [
                        patient.hamlet,
                        patient.council + "*" +patient.ward + "*" + patient.village,
                        patient.council,
                        patient.region,
                        "",
                        "",
                        "H~" + patient.hamlet,
                        patient.council + "*" +patient.ward + "*" + patient.village,
                        patient.council,
                        patient.region,
                        "",
                        "",
                        "C~" + patient.hamlet,
                        patient.council + "*" +patient.ward + "*" + patient.village,
                        patient.council,
                        patient.region,
                        "",
                        "",
                        "BR",
                    ],
                    "",
                    [
                        "", "PRN", "", "PH", "", "", patient.phone, patient.phone,
                    ],
                    "",
                    "",
                    "",
                    "",
                    patient.unified_lifetime_number,
                    patient.driver_license_id,
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    patient.national_id,
                );
            adt.addSegment(
                "PV1",
                "",
                " ",
            );
            adt.addSegment(
                "IN1",
                "",
                patient.nhif_id,
                "",
                "NHIF",
            );
            adt.addSegment(
                "ZXT",
                patient.voter_id,
                [
                    patient.birth_certificate_entry_number,
                    "TZA",
                    "BTH_CRT",
                    "",
                    "Tanzania",
                ],
                "",
                "",
            );

                var parser = new hl7.Parser();

                var msg = parser.parse(adt.toString());

                console.log('******sending message******')
                client.send(msg, function(err, ack) {
                console.log('******ack received******')
                console.log(ack.log())
                console.log(req.params.ClientId)
                console.log('******updating client status******')
                Client.update({status: 1}, {where: {id: req.params.ClientId}})
                console.log('******client status updated******')
                client => res.render("client", {"client": patient})
            }
            )
        })
    },

    // Push all the clients to a HL7 source
    pushAll(req, _res) {
        var patient = Client.findByPk(req.params.ClientId);
        arr.forEach(patient => {
            patient.then(function (patient) {
                var client = hl7.Server.createTcpClient('localhost', 60920);
                // create a message
                var adt = new hl7.Message(
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
                    adt.addSegment(
                        "EVN",
                        "",
                        Math.floor(Date.now()),
                    );
                    adt.addSegment(
                        "PID",
                        "",
                        "",
                        [
                            patient.ctc_id,
                            "",
                            "",
                            "Manyara RRH Afyacare",
                            "",
                            "MRRH OPD",
                            "",
                            patient.lastname,
                            patient.firstname,
                            patient.middlename,
                            "",
                            "",
                            "",
                            "L",
                        ],
                        "",
                        patient.date_of_birth,
                        patient.sex,
                        [
                            "",
                            "",
                        ],
                        "",
                        [
                            patient.hamlet,
                            patient.council + "*" +patient.ward + "*" + patient.village,
                            patient.council,
                            patient.region,
                            "",
                            "",
                            "H~" + patient.hamlet,
                            patient.council + "*" +patient.ward + "*" + patient.village,
                            patient.council,
                            patient.region,
                            "",
                            "",
                            "C~" + patient.hamlet,
                            patient.council + "*" +patient.ward + "*" + patient.village,
                            patient.council,
                            patient.region,
                            "",
                            "",
                            "BR",
                        ],
                        "",
                        [
                            "", "PRN", "", "PH", "", "", patient.phone, patient.phone,
                        ],
                        "",
                        "",
                        "",
                        "",
                        patient.unified_lifetime_number,
                        patient.driver_license_id,
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        "",
                        patient.national_id,
                    );
                adt.addSegment(
                    "PV1",
                    "",
                    " ",
                );
                adt.addSegment(
                    "IN1",
                    "",
                    patient.nhif_id,
                    "",
                    "NHIF",
                );
                adt.addSegment(
                    "ZXT",
                    patient.voter_id,
                    [
                        patient.birth_certificate_entry_number,
                        "TZA",
                        "BTH_CRT",
                        "",
                        "Tanzania",
                    ],
                    "",
                    "",
                );

                    var parser = new hl7.Parser();

                    var msg = parser.parse(adt.toString());

                    console.log('******sending message******')
                    client.send(msg, function(err, ack) {
                    console.log('******ack received******')
                    console.log(ack.log());
                })
                })
            })
    },

};