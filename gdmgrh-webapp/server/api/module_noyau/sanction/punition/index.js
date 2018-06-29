'use strict';

import {Router} from 'express';
import * as AuthService from '../../../service/auth.service';
import * as controller from './punition.controller';

var router = new Router();

router.get('/', AuthService.hasRole('admin'), controller.getAllPunition);
router.post('/', AuthService.hasRole('admin'), controller.addPunition);
router.put('/', AuthService.hasRole('admin'), controller.updatePunition);
router.delete('/delete/:id', AuthService.hasRole('admin'), controller.deletePunition);

module.exports = router;