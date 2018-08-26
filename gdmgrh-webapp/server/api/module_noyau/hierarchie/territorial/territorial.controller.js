'use strict';

import Territorial from './territorial.model';
import GenericRepository from '../../../service/generic.repository';
import * as SubdivisionController from '../subdivision/subdivision.controller';
import * as EntiteController from '../entite/entite.controller';
import * as Constante from '../../../../config/constante';
import Errorshandling from '../../../service/errorshandling';

const TerritorialRepository = new GenericRepository(Territorial);

export async function saveTerritorial(territorial, res) {
  var territorialsave = null;
  territorial = new Territorial(territorial);
  try {
    territorialsave = await TerritorialRepository.save(territorial);
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
  }
  return territorialsave;
}

export async function addTerritorial(req, res) {
  var territorialtore = null;
  var idsections = [];
  var idcompagnie = [];
  try {
    const territorialmain = Constante.territorial.territorialmain;
    const allsection = Constante.territorial.allsection;
    const alllegions = Constante.territorial.alllegions;
    for(let keysection = 0; keysection < allsection.length; keysection++) {
      var onesection = await SubdivisionController.saveSubdivision(allsection[keysection], res);
      idsections.push(onesection);
    }
    territorialmain.section = idsections;
    idsections = [];
    for(let keylegion = 0; keylegion < alllegions.length; keylegion++) {
      var element = alllegions[keylegion];
      for(let keycomp = 0; keycomp < element.compagnie.length; keycomp++) {
        var onecompa = await EntiteController.storeEntiteHandler(element.compagnie[keycomp], res);
        idcompagnie.push(onecompa._id);
      }
      element.compagnie = idcompagnie;
      idcompagnie = [];
    }
    territorialmain.legion = alllegions;
    territorialtore = await saveTerritorial(territorialmain, res);
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
  }
  return res.json({territorialtore});
}

export async function getTerritorial(req, res) {
  var allTerritorial = null;
  try {
    allTerritorial = await TerritorialRepository.getAllWithPopulate({path: 'section'}, {path: 'legion.compagnie', populate: { path: 'sousentite' }});
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
  }
  return res.json({allTerritorial});
}

export async function updateTerritorial(req, res) {
  var idbody = req.params.id;
  var nombody = req.body.nom;
  var codebody = req.body.code;
  var lieubody = req.body.lieu;
  var contactbody = req.body.contact;
  var gpsbody = req.body.gps;
  var chefbody = req.body.chef;
  var sectionbody = req.body.section;
  var legionbody = req.body.legion;
  if(nombody && codebody && lieubody && sectionbody && legionbody
    && contactbody && chefbody && gpsbody && idbody) {
    var updateResponse = null;
  }
}

export async function updateLegion(req, res) {
  var idbody = req.params.id;
  var nombody = req.body.nom;
  var codebody = req.body.code;
  var lieubody = req.body.lieu;
  var contactbody = req.body.contact;
  var gpsbody = req.body.gps;
  var chefbody = req.body.chef;
  var etatmajorbody = req.body.etatmajor;
  var brigadebody = req.body.brigade;
  var compagniebody = req.body.compagnie;
  if(nombody && codebody && lieubody && brigadebody && compagniebody
    && contactbody && chefbody && gpsbody && etatmajorbody && idbody) {
    var updateResponse = null;
  }
}
