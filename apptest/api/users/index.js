var express = require('express');
var router = express.Router();
var UserController = require('./user.controller');

const controller = new UserController();

router.get('/data', controller.getDataUser);

router.get('/', controller.getAllUser);
router.post('/', controller.addUser);
router.put('/:id', controller.updateUser);
router.get('/:id', controller.getOneUser);



module.exports = router;