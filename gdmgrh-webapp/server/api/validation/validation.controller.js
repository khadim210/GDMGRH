import Validation from './validation.model';
import GenericRepository from '../service/generic.repository';
import Errorshandling from '../service/errorshandling';
import * as ControllerPromotion from '../module-dam/promotion/promotion.controller';

const ValidationRepository = new GenericRepository(Validation);

export async function saveValidation(validation, res) {
  var storeValidation = null;
  validation = new Validation(validation);
  try {
    storeValidation = await ValidationRepository.save(validation);
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur Server');
  }
  return storeValidation;
}

export async function getAllValidation(res) {
  var validation = [];
  try {
    validation = await ValidationRepository.getAllWithPopulate({path: 'validInsert'}, {path: 'creator'});
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur Server');
  }
  return validation;
}

export async function getOneValidation(criteria, res) {
  var validation = null;
  try {
    validation = await ValidationRepository.populateGetOneBy(criteria, {path: 'validInsert'});
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
  }
  return validation;
}

export async function createValidation(validation, res) {
  let libelleBody = validation.libelle;
  let validIdInsertBody = validation.validIdInsert;
  let categorieBody = validation.categorie;
  let divisionBody = validation.division;
  let creatorBody = validation.creator;
  let typeBody = validation.type;
  if(libelleBody && validIdInsertBody && categorieBody && typeBody
    && divisionBody && creatorBody) {
    let storeResponse = null;
    try {
      validation = new Validation(validation);
      storeResponse = await ValidationRepository.save(validation);
      return storeResponse;
    } catch(error) {
      Errorshandling.handleError(res, error.code, error, 'Erreur Interne');
    }
  } else {
    Errorshandling.handleError(res, 422, 'Bad Parameter !!!', 'Mauvais paramètre !!!');
  }
}

export async function getAll(req, res) {
  try {
    var validations = null;
    validations = await ValidationRepository.getAll();
    return res.json({validations});
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
  }
}

export async function update(req, res) {
  var idbody = req.params.id;
  let libelleBody = req.body.libelle;
  let validIdInsertBody = req.body.validIdInsert;
  let categorieBody = req.body.categorie;
  let divisionBody = req.body.division;
  let creatorBody = req.body.creator;
  let typeBody = req.body.type;
  let statusBody = req.body.status;
  if(libelleBody && validIdInsertBody && categorieBody && typeBody
    && divisionBody && creatorBody && statusBody) {
    var validation = null;

    try {
      validation = await ValidationRepository.getOne(idbody);
    } catch(error) {
      return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
    }

    if(validation) {
      try {
        validation.status = statusBody;
        validation = await saveValidation(validation, res);
        if(categorieBody === 'promotion') {
          let promotion = await ControllerPromotion.getOnePromotion({_id: validIdInsertBody});
          console.log(promotion)
          promotion.active = true;
          promotion = await ControllerPromotion.savePromotion(promotion, res);
        }
        return res.json({validation});
      } catch(error) {
        return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
      }
    } else {
      return Errorshandling.handleError(res, 422, 'This validation doesn\'t existe !!!',
                'Cette validation n\'existe pas déjà');
    }
  } else {
    return Errorshandling.handleError(res, 422, 'Bad Parameter !!!', 'Mauvais paramètre ...');
  }
}
