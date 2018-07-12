'use strict';

import {Router} from 'express';
import * as AuthService from '../service/auth.service';
import * as controller from './media.controller';

var router = new Router();

router.post('/upload/picture', AuthService.hasRole('admin'), controller.create);
router.post('/upload/file', AuthService.hasRole('admin'), controller.create);

module.exports = router;
