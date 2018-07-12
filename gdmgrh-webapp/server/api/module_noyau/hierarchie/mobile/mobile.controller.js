'use strict';

import Mobile from './mobile.model';
import GenericRepository from '../../../service/generic.repository';
import * as SubdivisionController from '../subdivision/subdivision.controller';
import * as EntiteController from '../entite/entite.controller';
import Errorshandling from '../../../service/errorshandling';
import * as Constante from '../../../../config/constante';

const MobileRepository = new GenericRepository(Mobile);

async function saveMobile(mobile, res) {
  var storeMobile = null;
  mobile = new Mobile(mobile);
  try {
    storeMobile = await MobileRepository.save(mobile);
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
  }
  return storeMobile;
}

export async function addMobile(req, res) {
  var mobilestore = null;
  var idunites = [];
  var idlegions = [];
  try {
    var mobilemain = Constante.mobile.mobilemain;
    var allUnite = Constante.mobile.allUnite;
    var allLegion = Constante.mobile.allLegion;
    for(let keyunite = 0; keyunite < allUnite.length; keyunite++) {
      var oneUnite = await SubdivisionController.saveSubdivision(allUnite[keyunite], res);
      idunites.push(oneUnite._id);
    }
    mobilemain.unite = idunites;
    for(let keylegon = 0; keylegon < allLegion.length; keylegon++) {
      var oneLegion = await EntiteController.storeEntiteHandler(allLegion[keylegon], res);
      idlegions.push(oneLegion._id);
    }
    mobilemain.legion = idlegions;
    mobilestore = await saveMobile(mobilemain, res);
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
  }
  return res.json({mobilestore});
}

export async function getMobile(req, res) {
  var allMobile = null;
  try {
    allMobile = await MobileRepository.getAllWithPopulate({path: 'unite'}, {path: 'legion'});
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
  }
  return res.json({allMobile});
}
