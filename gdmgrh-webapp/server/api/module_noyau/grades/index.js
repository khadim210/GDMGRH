'use strict';

import {Router} from 'express';
import * as controller from './grades.controller';
import * as AuthService from '../../service/auth.service';

var router = new Router();

//router.get('/', auth.hasRole('admin'), controller.index);
/*router.get('/', controller.getAllUser);
router.post('/', controller.addUser);
router.put('/:id', controller.updateUser);
router.get('/:id', controller.getOneUser);
*/

router.get('/getall', AuthService.hasRole('admin'), controller.getallgrades);
router.get('/getallniv', AuthService.hasRole('admin'), controller.getallniveaux);
router.get('/getallcat', AuthService.hasRole('admin'), controller.getallcategories);
router.post('/add', AuthService.hasRole('admin'), controller.addgrade);
//router.put('/edit/:id', controller.editdiplome);
router.delete('/:id', AuthService.hasRole('admin'), controller.deletegrade);

module.exports = router;
