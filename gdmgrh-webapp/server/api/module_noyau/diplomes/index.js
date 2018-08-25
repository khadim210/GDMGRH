'use strict';

import {Router} from 'express';
import * as controller from './diplomes.controller';
import * as AuthService from '../../service/auth.service';

var router = new Router();

//router.get('/', auth.hasRole('admin'), controller.index);
/*router.get('/', controller.getAllUser);
router.post('/', controller.addUser);
router.put('/:id', controller.updateUser);
router.get('/:id', controller.getOneUser);
*/

router.get('/getallcivil', controller.getcivildiplomes);
router.get('/getallmili', AuthService.hasRole('admin'), controller.getmilidiplomes);
router.get('/getall', AuthService.hasRole('admin'), controller.getalldiplomes);
router.post('/add', AuthService.hasRole('admin'), controller.adddiplome);
router.put('/edit/:id', AuthService.hasRole('admin'), controller.editdiplome);
router.delete('/:id', AuthService.hasRole('admin'), controller.deletediplome);

module.exports = router;
