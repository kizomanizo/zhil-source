var express = require('express');
var router = express.Router();

// Defining client controllers here
const clientController = require('../controllers/client');
const messageController = require('../controllers/message');

// Client Routes
router.get('/', clientController.all);
router.get('/details/:ClientUuid', clientController.details);
router.get('/edit/:ClientUuid', clientController.edit);
router.post('/edit/:ClientUuid', clientController.update)
router.get('/push/:ClientUuid', messageController.push);
router.get('/pushall', messageController.pushAll);
router.get('/seed', messageController.seed);
router.get('/confirm', messageController.confirm);
// router.get('/alert', messageController.alert);
router.get('/redirect', messageController.redirect);

module.exports = router;