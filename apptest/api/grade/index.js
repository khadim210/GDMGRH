var express = require('express');
var router = express.Router();

const controller = require('./grade.controller');

router.get('/getall', controller.getallgrades);

//router.post('/add', controller.adddiplome);
//router.put('/edit/:id', controller.editdiplome);
//router.delete('/:id', controller.deletediplome);

//.put('/:id', controller.editdiplome);
//router.post('/:id', controller.deletediplome);
//router.post('/', controller.addUser);
//router.put('/:id', controller.updateUser);

//router.get('/:id', controller.getOneUser);

module.exports = router;