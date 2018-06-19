var express = require('express');
var router = express.Router();
var GroupeController = require('./groupe.controller');
const controller = new GroupeController();

router.post('/', controller.createUserGroupe);
router.get('/', controller.getAllUserGroupe);
router.get('/data', controller.getGoupData);

router.put('/:_id', controller.updateUserGroupe);
router.get('/:_id', controller.getOneUserGroupe);



module.exports = router;