'use strict';

import {Router} from 'express';
import * as AuthService from '../../../service/auth.service';
import * as controller from './territorial.controller';

var router = new Router();

//router.post('/add', AuthService.hasRole('admin'), controller.addTerritorial);
router.get('/all', AuthService.hasRole('admin'), controller.getTerritorial);
module.exports = router;
