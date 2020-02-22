var express = require('express');
var router = express.Router();

// Defining client controllers here
const clientController = require('../controllers/client');

// Client Routes
router.get('/', clientController.all);
router.get('/details/:ClientId', clientController.details);
router.get('/push/:ClientId', clientController.push);
router.get('/push/all', clientController.pushAll);

module.exports = router;