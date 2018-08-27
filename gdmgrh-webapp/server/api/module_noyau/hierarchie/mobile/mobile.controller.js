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


var mobilemain = Constante.mobile.mobilemain;
var allUnite = Constante.mobile.allUnite;
var allLegion = Constante.mobile.allLegion;

export async function addMobile(req, res) {
  await handlerMobile(mobilemain, allUnite, allLegion, res);
}

export async function handlerMobile(mainMobile, uniteAll, legionAll, res) {
  var mobilestore = null;
  var idunites = [];
  var idlegions = [];
  try {
    for(let keyunite = 0; keyunite < uniteAll.length; keyunite++) {
      var oneUnite = await SubdivisionController.saveSubdivision(uniteAll[keyunite], res);
      idunites.push(oneUnite._id);
    }
    mainMobile.unite = idunites;
    for(let keylegon = 0; keylegon < legionAll.length; keylegon++) {
      var oneLegion = await EntiteController.storeEntiteHandler(legionAll[keylegon], res);
      idlegions.push(oneLegion._id);
    }
    mainMobile.legion = idlegions;
    mobilestore = await saveMobile(mainMobile, res);
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
  }
  return mobilestore;
}

export async function getMobile(req, res) {
  var allMobile = null;
  try {
    allMobile = await MobileRepository.getAllWithPopulate({path: 'unite'}, {path: 'legion', populate: { path: 'sousentite' }});
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
  }
  return res.json({allMobile});
}

export async function updateMobile(req, res) {
  var idbody = req.params.id;
  var nombody = req.body.nom;
  var codebody = req.body.code;
  var lieubody = req.body.lieu;
  var contactbody = req.body.contact;
  var gpsbody = req.body.gps;
  var chefbody = req.body.chef;
  var unitebody = req.body.unite;
  var legionbody = req.body.legion;
  if(nombody && codebody && lieubody && unitebody && legionbody
    && contactbody && chefbody && gpsbody && idbody) {
    var updateResponse = null;
  }
}
