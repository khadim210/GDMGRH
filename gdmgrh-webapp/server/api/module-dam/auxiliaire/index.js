'use strict';

import {Router} from 'express';
import * as AuthService from '../../service/auth.service';
import * as controller from './auxiliaire.controller';

var router = new Router();

router.post('/add', controller.create);
router.put('/update/:id', controller.update);
router.get('/all', controller.getAll);
router.get('/matricule/:matricule', controller.getOne);

module.exports = router;
