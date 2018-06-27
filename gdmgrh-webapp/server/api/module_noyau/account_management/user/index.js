'use strict';

import {Router} from 'express';
import * as controller from './user.controller';

var router = new Router();

//router.get('/', auth.hasRole('admin'), controller.index);
router.get('/', controller.getAllUser);
router.get('/data', controller.getDataUser);
router.post('/', controller.addUser);
router.put('/:id', controller.updateUser);
router.get('/:id', controller.getOneUser);
module.exports = router;
