var express = require('express');
var router = express.Router();

// Defining client controllers here
const clientController = require('../controllers/client');
const messageController = require('../controllers/message');
const plainmessageController = require('../controllers/plainmessage');

// Client Routes
router.get('/', clientController.all);
router.get('/details/:ClientId', clientController.details);
router.get('/push/:ClientId', plainmessageController.push);
router.get('/pushall', clientController.pushAll);

module.exports = router;