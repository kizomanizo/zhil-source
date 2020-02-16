var express = require('express');
var router = express.Router();

// Defining client controllers here
const clientController = require('../controllers/client');

// Client Routes
router.get('/', clientController.all);
router.post('/', clientController.update);
router.get('/details/:ClientId', clientController.details);
router.get('/push/:ClientId', clientController.push);

module.exports = router;