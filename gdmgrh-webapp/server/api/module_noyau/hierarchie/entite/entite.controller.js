'use strict';

import Entite from './entite.model';
import GenericRepository from '../../../service/generic.repository';
import * as SubdivisionController from '../subdivision/subdivision.controller';
import Errorshandling from '../../../service/errorshandling';

const EntiteRepository = new GenericRepository(Entite);

export async function saveEntite(entite, res) {
  var entitesave = null;
  entite = new Entite(entite);
  try {
    entitesave = await EntiteRepository.save(entite);
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
  }
  return entitesave;
}

export async function getAllEntite(res) {
  var entite = [];
  try {
    entite = await EntiteRepository.getAllWithPopulate({path: 'sousentite'}, {path: 'chef'});
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur Server');
  }
  return entite;
}

export async function getOneEntite(criteria, res) {
  var entite = null;
  try {
    entite = await EntiteRepository.populateGetOneBy(criteria, {path: 'sousentite'});
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
  }
  return entite;
}

export async function storeEntiteHandler(entite, res) {
  var allSousEntite = [];
  var entitestore = null;
  var sousentite = [];
  try {
    allSousEntite = entite.sousentite;
    if(allSousEntite) {
      for(let key = 0; key < allSousEntite.length; key++) {
        var oneSousEntite = await SubdivisionController.saveSubdivision(allSousEntite[key], res);
        sousentite.push(oneSousEntite._id);
      }
    }
    entite.sousentite = sousentite;
    entitestore = await saveEntite(entite);
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
  }
  return entitestore;
}

