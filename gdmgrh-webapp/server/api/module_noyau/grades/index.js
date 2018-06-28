'use strict';

import {Router} from 'express';
import * as controller from './grades.controller';

var router = new Router();

//router.get('/', auth.hasRole('admin'), controller.index);
/*router.get('/', controller.getAllUser);
router.post('/', controller.addUser);
router.put('/:id', controller.updateUser);
router.get('/:id', controller.getOneUser);
*/

router.get('/getall', controller.getallgrades);
router.get('/getallniv', controller.getallniveaux);
router.get('/getallcat', controller.getallcategories);
router.post('/add', controller.addgrade);
//router.put('/edit/:id', controller.editdiplome);
router.delete('/:id', controller.deletegrade);

module.exports = router;
