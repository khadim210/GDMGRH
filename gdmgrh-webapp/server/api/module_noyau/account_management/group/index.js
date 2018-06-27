'use strict';

import {Router} from 'express';
import * as controller from './groupe.controller';

var router = new Router();

router.post('/', controller.createUserGroupe);
router.get('/', controller.getAllUserGroupe);
router.get('/data', controller.getGoupData);

router.put('/:_id', controller.updateUserGroupe);
router.get('/:_id', controller.getOneUserGroupe);



module.exports = router;