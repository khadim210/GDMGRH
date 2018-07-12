'use strict';

import {Router} from 'express';
import * as AuthService from '../../../service/auth.service';
import * as controller from './mobile.controller';

var router = new Router();

//router.post('/add', AuthService.hasRole('admin'), controller.addMobile);
router.get('/all', AuthService.hasRole('admin'), controller.getMobile);
module.exports = router;
