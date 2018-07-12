'use strict';

import {Router} from 'express';
import * as AuthService from '../../../service/auth.service';
import * as controller from './user.controller';

var router = new Router();

router.post('/signin', controller.signin);
router.post('/', AuthService.hasRole('admin'), controller.addUser);
router.get('/', AuthService.hasRole('admin'), controller.getAllUser);
router.get('/data', AuthService.hasRole('admin'), controller.getDataUser);
router.get('/get-one-user/:id', controller.getOneUser);
router.put('/update-user/:id', controller.updateUser);

module.exports = router;
