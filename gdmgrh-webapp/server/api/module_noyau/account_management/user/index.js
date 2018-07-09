'use strict';

import {Router} from 'express';
import * as AuthService from '../../../service/auth.service';
import * as controller from './user.controller';

var router = new Router();

router.post('/signin', controller.signin);
router.get('/', AuthService.hasRole('admin'), controller.getAllUser);
router.get('/data', AuthService.hasRole('admin'), controller.getDataUser);
router.post('/', AuthService.hasRole('admin'), controller.addUser);
//router.put('/update-user', controller.updateUser);
//router.get('/get-one-user', controller.getOneUser);
router.put('/:id', AuthService.hasRole('admin'), controller.updateUser);
router.get('/:id', AuthService.hasRole('admin'), controller.getOneUser);
module.exports = router;
