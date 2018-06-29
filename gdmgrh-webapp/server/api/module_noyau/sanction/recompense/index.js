'use strict';

import {Router} from 'express';
import * as AuthService from '../../../service/auth.service';
import * as controller from './recompense.controller';

var router = new Router();

router.get('/', AuthService.hasRole('admin'), controller.getAllRecompense);
router.post('/', AuthService.hasRole('admin'), controller.addRecompense);
router.put('/', AuthService.hasRole('admin'), controller.updateRecompense);
router.delete('/delete/:id', AuthService.hasRole('admin'), controller.deleteRecompense);

module.exports = router;