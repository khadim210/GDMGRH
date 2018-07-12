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


export async function addEtatMajor(req, res) {
  var etatmajorconst = Constante.etatmajor;
  var allDivision = [etatmajorconst.division0, etatmajorconst.division1, etatmajorconst.division2, etatmajorconst.division3];
  var division = [];
  var iddivision = [];
  var etatmajor = null;
  var oneDivision = null;
  try {
    var etatmajormain = etatmajorconst.etatmajormain;
    for(let keydiv = 0; keydiv < allDivision.length; keydiv++) {
      var _division = allDivision[keydiv];
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
  return res.json({etatmajor});
}

export async function getEtatMajor(req, res) {
  var alletatmajor = null;
  try {//['courses.id_course']
    alletatmajor = await EtatMajorRepository.getAllPopulate({path: 'division.iddivision'});
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
  }
  return res.json({alletatmajor});
}
