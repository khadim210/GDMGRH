'use strict';

import {Router} from 'express';
import * as AuthService from '../../../service/auth.service';
import * as controller from './sous-command.controller';

var router = new Router();

//router.post('/add', AuthService.hasRole('admin'), controller.addSousCommandement);
router.post('/one', AuthService.hasRole('admin'), controller.getOneSousCommandement);
module.exports = router;
