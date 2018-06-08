var express = require('express');
var router = express.Router();

const controller = require('./punition.controller');

router.get('/', controller.getAllPunition);
router.post('/', controller.addPunition);

module.exports = router;