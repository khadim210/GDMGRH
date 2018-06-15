var express = require('express');
var router = express.Router();

const controller = require('./user.controller');

router.get('/', controller.getAllUser);
router.post('/', controller.addUser);
router.get('/groupe/data', controller.getGoupData);


router.put('/:id', controller.updateUser);

router.post('/groupe', controller.createUserGroupe);
router.get('/groupe', controller.getAllUserGroupe);
router.put('/groupe/:_id', controller.updateUserGroupe);

router.get('/groupe/:_id', controller.getOneUserGroupe);
router.get('/:id', controller.getOneUser);



module.exports = router;