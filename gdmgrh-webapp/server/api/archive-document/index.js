'use strict';

import {Router} from 'express';
import * as AuthService from '../service/auth.service';
import * as controller from './archive-document.controller';

var router = new Router();

router.post('/', controller.createArchiveDocument);
router.put('/:id', controller.updateArchiveDocument);
router.get('/all', controller.getAll);
router.get('/:module', controller.getByCriteria);

module.exports = router;
