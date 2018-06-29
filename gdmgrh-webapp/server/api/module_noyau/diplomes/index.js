'use strict';

import {Router} from 'express';
import * as controller from './diplomes.controller';

var router = new Router();

//router.get('/', auth.hasRole('admin'), controller.index);
/*router.get('/', controller.getAllUser);
router.post('/', controller.addUser);
router.put('/:id', controller.updateUser);
router.get('/:id', controller.getOneUser);
*/

router.get('/getallcivil', controller.getcivildiplomes);
router.get('/getallmili', controller.getmilidiplomes);
router.get('/getall', controller.getalldiplomes);
router.post('/add', controller.adddiplome);
router.put('/edit/:id', controller.editdiplome);
router.delete('/:id', controller.deletediplome);

module.exports = router;
