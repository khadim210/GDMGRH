'use strict';

import {Router} from 'express';
import * as AuthService from '../../../service/auth.service';
import * as controller from './groupe.controller';

var router = new Router();

router.post('/', AuthService.hasRole('admin'), controller.createUserGroupe);
router.get('/', AuthService.hasRole('admin'), controller.getAllUserGroupe);
router.get('/data', controller.getGoupData);

router.put('/update-groupe/:_id', AuthService.hasRole('admin'), controller.updateUserGroupe);
router.get('/get-one-groupe/:_id', AuthService.hasRole('admin'), controller.getOneUserGroupe);

module.exports = router;
