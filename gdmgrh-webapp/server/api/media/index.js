'use strict';

import {Router} from 'express';
import * as AuthService from '../service/auth.service';
import * as controller from './media.controller';

var router = new Router();

router.post('/upload/picture', AuthService.hasRole('admin'), controller.create);
router.post('/upload/file', AuthService.hasRole('admin'), controller.create);


router.post('/chef_division/upload/file', AuthService.hasRole('chef_division'), controller.create);
router.post('/chef_division/upload/picture', AuthService.hasRole('chef_division'), controller.create);


router.post('/chef_secretaire/upload/file', AuthService.hasRole('chef_secretaire'), controller.create);
router.post('/chef_secretaire/upload/picture', AuthService.hasRole('chef_secretaire'), controller.create);


router.post('/secretaire/upload/file', AuthService.hasRole('secretaire'), controller.create);
router.post('/secretaire/upload/picture', AuthService.hasRole('secretaire'), controller.create);

router.get('/upload/file/:id', controller.getFileUpload);

module.exports = router;
