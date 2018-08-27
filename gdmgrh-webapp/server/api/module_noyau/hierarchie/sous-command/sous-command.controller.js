'use strict';

import SousCommandement from './sous-command.model';
import GenericRepository from '../../../service/generic.repository';
import Errorshandling from '../../../service/errorshandling';
import * as Constante from '../../../../config/constante';

const SousCommandementRepository = new GenericRepository(SousCommandement);
var constante = Constante.souscommandt;
var allSousCommandement = [constante.commandement1, constante.commandement2, constante.commandement3,
                              constante.commandement4, constante.commandement5];

export async function addSousCommandement(req, res) {
  await handlerSousCommandement(allSousCommandement, res);
}

export async function handlerSousCommandement(sousCommandement, res) {
  var storeCommandement = null;
  try {
    for(let index = 0; index < sousCommandement.length; index++) {
      storeCommandement = await saveSousCommandement(sousCommandement[index], res);
    }
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
  }
  return storeCommandement;
}

export async function saveSousCommandement(commandement, res) {
  var saveCommand = null;
  var _commandement = new SousCommandement(commandement);
  try {
    saveCommand = await SousCommandementRepository.save(_commandement);
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
  }
  return saveCommand;
}

export async function getOneSousCommandement(req, res) {
  var type = req.params.type;
  var souscommandt = null;
  if(type) {
    try {
      souscommandt = await SousCommandementRepository.getOneBy({categorie: type});
    } catch(error) {
      return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
    }
  }
  return res.json({souscommandt});
}

export async function getAllSousCommandement(res) {
  var sousCommand = [];
  try {
    sousCommand = await SousCommandementRepository.getAll();
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur Server');
  }
  return sousCommand;
}

export async function updateSousCommandement(req, res) {
  var idbody = req.params.id;
  var nombody = req.body.nom;
  var codebody = req.body.code;
  var lieubody = req.body.lieu;
  var contactbody = req.body.contact;
  var gpsbody = req.body.gps;
  var chefbody = req.body.chef;
  var subdivisionbody = req.body.subdivision;
  if(nombody && codebody && subdivisionbody && idbody) {
    var updateResponse = null;
    try {
      updateResponse = await SousCommandementRepository.getOne(idbody);
    } catch(error) {
      return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
    }
    if(updateResponse) {
      updateResponse.nom = nombody;
      updateResponse.code = codebody;
      updateResponse.lieu = lieubody;
      updateResponse.contact = contactbody;
      updateResponse.gps = gpsbody;
      updateResponse.chef = chefbody;
      updateResponse.subdivision = subdivisionbody;
      updateResponse = await saveSousCommandement(updateResponse, res);
      return res.json({souscommandt: updateResponse});
    } else {
      return Errorshandling.handleError(res, 500, 'error', 'Erreur serveur !!!');
    }
  } else {
    return Errorshandling.handleError(res, 422, 'Bad Parameter', 'Mauvais paramètrage !!!');
  }
}
