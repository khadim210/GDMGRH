'use strict';

import Subdivision from './subdivision.model';
import GenericRepository from '../../../service/generic.repository';
import Errorshandling from '../../../service/errorshandling';

const SubdivisionRepository = new GenericRepository(Subdivision);

export async function saveSubdivision(subdivision, res) {
  var saveSub = null;
  subdivision = new Subdivision(subdivision);
  try {
    saveSub = await SubdivisionRepository.save(subdivision);
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
  }
  return saveSub;
}

