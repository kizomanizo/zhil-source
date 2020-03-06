const express = require('express');
const Client = require('../models').Client;

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
        .then(clients => res.render('clients/index', {
            "clients": clients.rows,
            "pagesCount": Math.ceil(clients.count/limit),
            "currentPage": page,
        }))
        .catch(error => res.status(400).send(error));
    },

    // Search for a specific client using UUID, for Primary key utumie findByPk(req.params.ClientId)
    details(req, res) {
        Client.findOne({where: {uuid: req.params.ClientUuid} })
        // Client.findByPk(req.params.ClientId)
        .then(client => res.render("clients/details", {"client": client}))
        .catch(error => res.status(400).send(error));
    },

    // Search for a specific client using UUID, for Primary key utumie findByPk(req.params.ClientId)
    edit(req, res) {
        Client.findOne({where: {uuid: req.params.ClientUuid} })
        // Client.findByPk(req.params.ClientId)
        .then(client => res.render("clients/edit", {"client": client}))
        .catch(error => res.status(400).send(error));
    },

    update(req, res, next) {
        console.log(req.body)
        Client.update(
            {
                firstname: req.body.firstname,
                middlename: req.body.middlename,
                lastname: req.body.lastname,
                othername: req.body.othername,
                uln: req.body.uln,
                national_id: req.body.national_id,
                voter_id: req.body.voter_id,
                dl_id: req.body.dl_id,
                nhif_id: req.body.nhif_id,
                ichf_id: req.body.ichf_id,
                rita_id: req.body.rita_id,
                ctc_id: req.body.ctc_id,
                tb_id: req.body.tbid,
                sex: req.body.sex,
                dob: req.body.dob,
                phone_prefix: req.body.phone_prefix,
                phone_suffix: req.body.phone_suffix,
            },
            {returning: true, where: {uuid: req.params.ClientUuid} }
            
            )
            .then(res.redirect('back'))
            .catch(next)
    },
};