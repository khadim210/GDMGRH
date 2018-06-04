var express = require('express');
var router = express.Router();

const controller = require('./user.controller');

router.get('/', controller.getAllUser);
router.post('/', controller.addUser);
router.put('/:id', controller.updateUser);

router.get('/:id', controller.getOneUser);

module.exports = router;