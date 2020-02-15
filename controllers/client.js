const Client = require('../models').Client;

module.exports = {
    // List all clients in the system
    all(_req, res) {
        Client.findAll()
        .then(clients => res.render('clients', {"clients": clients}))
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

};