'use strict';

import {Router} from 'express';
import * as AuthService from '../../service/auth.service';
import * as controller from './candidat.controller';

var router = new Router();

router.post('/', controller.create);
router.put('/:id', controller.update);
router.get('/', controller.getAll);
router.get('/cni/:cni', controller.getOne);

router.post('/chef_division/', AuthService.hasRole('chef_division'), controller.create);
router.put('/chef_division/:id', AuthService.hasRole('chef_division'), controller.update);
router.get('/chef_division/', AuthService.hasRole('chef_division'), controller.getAll);
router.get('/chef_division/cni/:cni', AuthService.hasRole('chef_division'), controller.getOne);


router.post('/chef_secretaire/', AuthService.hasRole('chef_secretaire'), controller.create);
router.put('/chef_secretaire/:id', AuthService.hasRole('chef_secretaire'), controller.update);
router.get('/chef_secretaire/', AuthService.hasRole('chef_secretaire'), controller.getAll);
router.get('/chef_secretaire/cni/:cni', AuthService.hasRole('chef_secretaire'), controller.getOne);


router.post('/secretaire/', AuthService.hasRole('secretaire'), controller.create);
router.put('/secretaire/:id', AuthService.hasRole('secretaire'), controller.update);
router.get('/secretaire/', AuthService.hasRole('secretaire'), controller.getAll);
router.get('/secretaire/cni/:cni', AuthService.hasRole('secretaire'), controller.getOne);

module.exports = router;
