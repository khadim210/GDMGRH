'use strict';

import EtatMajor from './etat-major.model';
import GenericRepository from '../../../service/generic.repository';
import * as DivisionControllers from '../subdivision/subdivision.controller';
import Errorshandling from '../../../service/errorshandling';
import * as Constante from '../../../../config/constante';

const EtatMajorRepository = new GenericRepository(EtatMajor);

async function saveEtatMajor(etatmajor, res) {
  var saveEtatmajor = null;
  etatmajor = new EtatMajor(etatmajor);
  try {
    saveEtatmajor = await EtatMajorRepository.save(etatmajor);
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
  }
  return saveEtatmajor;
}

var etatmajorconst = Constante.etatmajor;
var allDivision = [etatmajorconst.division0, etatmajorconst.division1,
                    etatmajorconst.division2, etatmajorconst.division3];

export async function addEtatMajor(req, res) {
  await handlerEtatMajor(etatmajorconst, allDivision, res);
}

export async function handlerEtatMajor(constetatmajor, divisionAll, res) {
  var division = [];
  var iddivision = [];
  var etatmajor = null;
  var oneDivision = null;
  try {
    var etatmajormain = constetatmajor.etatmajormain;
    for(let keydiv = 0; keydiv < divisionAll.length; keydiv++) {
      var _division = divisionAll[keydiv];
      for(let keyiddiv = 0; keyiddiv < _division.iddivision.length; keyiddiv++) {
        var _iddivision = _division.iddivision[keyiddiv];
        oneDivision = await DivisionControllers.saveSubdivision(_iddivision);
        iddivision.push(oneDivision._id);
      }
      _division.iddivision = iddivision;
      division.push(_division);
      iddivision = [];
    }
    etatmajormain.division = division;
    etatmajormain = new EtatMajor(etatmajormain);
    etatmajor = await saveEtatMajor(etatmajormain, res);
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
  }
  return etatmajor;
}

export async function getEtatMajor(req, res) {
  var alletatmajor = null;
  try {
    alletatmajor = await EtatMajorRepository.getAllPopulate({path: 'division.iddivision'});
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
  }
  return res.json({alletatmajor});
}

export async function update(req, res) {
  var idbody = req.params.id;
  var nombody = req.body.nom;
  var codebody = req.body.code;
  var lieubody = req.body.lieu;
  var contactbody = req.body.contact;
  var gpsbody = req.body.gps;
  var chefbody = req.body.chef;
  var divisionbody = req.body.division;
  if(nombody && codebody && lieubody && divisionbody
    && contactbody && chefbody && gpsbody && idbody) {
    var updateResponse = null;
  }
}
