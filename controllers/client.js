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
};