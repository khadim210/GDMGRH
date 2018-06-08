var express = require('express');
var router = express.Router();

const controller = require('./grade.controller');

router.get('/', controller.getAllGrade);
router.post('/', controller.addGrade);
router.put('/:id', controller.updateGrade);

router.get('/:id', controller.getOneGrade);

module.exports = router;
