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

export async function getAllSubdivision(res) {
  var subdivision = [];
  try {
    subdivision = await SubdivisionRepository.getAllWithPopulate({path: 'chef'});
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur Server');
  }
  return subdivision;
}

export async function getOneSubdivision(criteria, res) {
  var subdivision = null;
  try {
    subdivision = await SubdivisionRepository.populateGetOneBy(criteria, {path: 'chef'});
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
  }
  return subdivision;
}
