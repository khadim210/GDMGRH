var express = require('express');
var router = express.Router();

const controller = require('./recompense.controller');

router.get('/', controller.getAllRecompense);
router.post('/', controller.addRecompense);

module.exports = router;