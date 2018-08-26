'use strict';

import {Router} from 'express';
import * as AuthService from '../service/auth.service';
import * as controller from './validation.controller';

var router = new Router();

router.get('/', controller.getAll);
router.post('/chef_division/', AuthService.hasRole('chef_division'), controller.getAll);
router.post('/chef_secretaire/', AuthService.hasRole('chef_secretaire'), controller.getAll);

router.put('/:id', controller.update);
router.put('/chef_division/', AuthService.hasRole('chef_division'), controller.update);
router.put('/chef_secretaire/', AuthService.hasRole('chef_secretaire'), controller.update);

module.exports = router;
