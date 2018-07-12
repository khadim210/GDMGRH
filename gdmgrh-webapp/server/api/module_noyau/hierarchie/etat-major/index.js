'use strict';

import {Router} from 'express';
import * as AuthService from '../../../service/auth.service';
import * as controller from './etat-major.controller';

var router = new Router();

//router.post('/add', AuthService.hasRole('admin'), controller.addEtatMajor);
router.get('/all', AuthService.hasRole('admin'), controller.getEtatMajor);

module.exports = router;
