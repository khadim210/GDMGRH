var express = require('express');
var router = express.Router();

const controller = require('./decoration.controller');

router.get('/', controller.getAllDecoration);
router.post('/', controller.addDecoration);

module.exports = router;