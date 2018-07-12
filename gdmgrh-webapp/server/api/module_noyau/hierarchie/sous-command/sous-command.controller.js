'use strict';

import SousCommandement from './sous-command.model';
import GenericRepository from '../../../service/generic.repository';
import Errorshandling from '../../../service/errorshandling';
import * as Constante from '../../../../config/constante';

const SousCommandementRepository = new GenericRepository(SousCommandement);

export async function addSousCommandement(req, res) {
  var constante = Constante.souscommandt;
  var storeCommandement = null;
  var allSousCommandement = [constante.commandement1, constante.commandement2, constante.commandement3,
                              constante.commandement4, constante.commandement5];
  try {
    for(let index = 0; index < allSousCommandement.length; index++) {
      storeCommandement = await saveSousCommandement(allSousCommandement[index], res);
    }
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
  }
  return res.json({storeCommandement});
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
  var type = req.body.type;
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
