'use strict';

import {Router} from 'express';
import * as controller from './agents.controller';

var router = new Router();

//router.get('/', auth.hasRole('admin'), controller.index);
/*router.get('/', controller.getAllUser);
router.post('/', controller.addUser);
router.put('/:id', controller.updateUser);
router.get('/:id', controller.getOneUser);
*/


router.post('/add', controller.addgendarme);
router.post('/:id', controller.editgendarme);
router.get('/getall', controller.getagents);
router.get('/getone/:id', controller.getoneagent);



module.exports = router;
