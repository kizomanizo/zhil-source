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
        Client.update(
            {
                firstname: req.body.firstname,
                middlename: req.body.middlename,
                lastname: req.body.lastname,
                othername: req.body.othername,
            },
            {returning: true, where: {uuid: req.params.ClientUuid} }
            
          )
          .then(function(rowsUpdated) {
            console.log(req.params.ClientUuid)
            // res.json(rowsUpdated)
          })
          .catch(next)


        //   const client = await Client.findOne({where: {uuid: req.params.ClientUuid}});
        //     if (!client) {
        //             throw Error(`Client not updated. uuid: ${uuid}`);
        //         }

        //         client.firstname = input.firstname;
        //         client.middlename = input.middlename;
        //         client.lastname = input.lastname;
        //         client.othername = input.othername;
        //         await client.save();
    },
};