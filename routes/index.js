var express = require('express');
var router = express.Router();

/* ZHIL Faker home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ZHIL Faker' });
});

module.exports = router;