import Promotion from './promotion.model';
import GenericRepository from '../../service/generic.repository';
import Errorshandling from '../../service/errorshandling';
import * as ControllerValidation from '../../validation/validation.controller';

const PromotionRepository = new GenericRepository(Promotion);

export async function savePromotion(promotion, res) {
  var storePromotion = null;
  promotion = new Promotion(promotion);
  try {
    storePromotion = await PromotionRepository.save(promotion);
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur Server');
  }
  return storePromotion;
}

export async function allPromotion(res) {
  var promotion = [];
  try {
    promotion = await PromotionRepository.getAll();
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur Server');
  }
  return promotion;
}

export async function getAllPromotions(res) {
  var promotion = [];
  try {
    promotion = await PromotionRepository.getAllWithPopulate({path: 'ordre'}, {path: 'candidats'});
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur Server');
  }
  return promotion;
}

export async function getOnePromotion(criteria, res) {
  var promotion = null;
  try {
    promotion = await PromotionRepository.populateGetOneBy(criteria, {path: 'candidat'});
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
  }
  return promotion;
}

export async function create(req, res) {
  var promotion = req.body.promotion;
  var numerobody = req.body.promotion.numero;
  var libellebody = req.body.promotion.libelle;
  var niveaubody = req.body.promotion.niveau;
  var effectifPrevubody = req.body.promotion.effectifPrevu;
  var attentsbody = req.body.promotion.attents;
  var ordrebody = req.body.promotion.ordre;
  var dateDebutbody = req.body.promotion.dateDebut;
  var dateFinbody = req.body.promotion.dateFin;
  if(numerobody && libellebody && niveaubody && effectifPrevubody
    && attentsbody && ordrebody && dateDebutbody && dateFinbody) {
    var storeResponse = null;

    try {
      storeResponse = await PromotionRepository.getOneBy({numero: numerobody});
    } catch(error) {
      return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
    }

    if(storeResponse) {
      return Errorshandling.handleError(res, 422, 'Try to create a promotion with a '
            + ' numero that already exists', 'Une promotion existe déjà sous ce numero');
    }

    try {
      storeResponse = await PromotionRepository.getOneBy({libelle: libellebody});
    } catch(error) {
      return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
    }

    if(storeResponse) {
      return Errorshandling.handleError(res, 422, 'Try to create a promotion with a '
            + ' libelle that already exists', 'Une promotion existe déjà sous ce libelle');
    }

    try {
      promotion = new Promotion(promotion);
      storeResponse = await PromotionRepository.save(promotion);
      if(storeResponse) {
        let status = 'attent';
        if(storeResponse.active === true) {
          status = 'valider';
        }
        let valided = {
          libelle: storeResponse.libelle,
          validIdInsert: storeResponse._id,
          categorie: 'promotion',
          type: 'creation',
          division: 'DAM',
          creator: req.user._id,
          status: status
        };
        valided = await ControllerValidation.createValidation(valided, res);
        return await getAll(req, res);
      }
      return res.json({storeResponse});
    } catch(error) {
      return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
    }
  } else {
    return Errorshandling.handleError(res, 422, 'Bad Parameter !!!', 'Veuillez renseignez tous les paramètres');
  }
}

export async function getAll(req, res) {
  try {
    var promotion = null;
    promotion = await PromotionRepository.getAllWithPopulate({path: 'ordre'}, {path: 'candidats'});
    if(!promotion) {
      promotion = [];
    }
    return res.json({promotion});
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
  }
}


export async function getOne(req, res) {
  var libellePromotion = req.params.libelle;
  if(libellePromotion) {
    try {
      var promotion = await getOnePromotion({libelle: libellePromotion});
      return res.json({promotion});
    } catch(error) {
      return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
    }
  } else {
    return Errorshandling.handleError(res, 422, 'Bad Parameter !!!', 'Mauvais paramètre ...');
  }
}

export async function update(req, res) {
  var idbody = req.params.id;
  var numerobody = req.body.numero;
  var libellebody = req.body.libelle;
  var niveaubody = req.body.niveau;
  var effectifPrevubody = req.body.effectifPrevu;
  var attentsbody = req.body.attents;
  var ordrebody = req.body.ordre;
  var dateDebutbody = req.body.dateDebut;
  var dateFinbody = req.body.dateFin;
  var statusbody = req.body.status;
  var candidatsbody = req.body.candidats;
  if(numerobody && libellebody && niveaubody && effectifPrevubody
    && attentsbody && dateDebutbody && dateFinbody && idbody) {
    var promotion = null;

    try {
      promotion = await PromotionRepository.getAll({numero: numerobody});
    } catch(error) {
      return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
    }

    if(promotion.length >= 2) {
      return Errorshandling.handleError(res, 422, 'Try to create a promotion with a '
            + ' numero that already exists', 'Une promotion existe déjà sous ce numero');
    }

    try {
      promotion = await PromotionRepository.getAll({libelle: libellebody});
    } catch(error) {
      return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
    }

    if(promotion.length >= 2) {
      return Errorshandling.handleError(res, 422, 'Try to create a promotion with a '
            + ' libelle that already exists', 'Une promotion existe déjà sous ce libelle');
    }

    try {
      promotion = await PromotionRepository.getOne(idbody);
    } catch(error) {
      return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
    }

    if(promotion) {
      try {
        promotion.libelle = libellebody;
        promotion.numero = numerobody;
        promotion.niveau = niveaubody;
        promotion.effectifPrevu = effectifPrevubody;
        promotion.attents = attentsbody;
        promotion.ordre = ordrebody;
        if(candidatsbody) {
          promotion.candidats = candidatsbody;
        }
        if(statusbody) {
          promotion.status = statusbody;
        }
        promotion.dateDebut = dateDebutbody;
        promotion.dateFin = dateFinbody;
        promotion = await savePromotion(promotion);
        if(promotion) {
          return await getAll(req, res);
        }
        return res.json({promotion});
      } catch(error) {
        return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
      }
    } else {
      return Errorshandling.handleError(res, 422, 'This promotion doesn\'t existe !!!',
                'Cette promotion n\'existe pas déjà');
    }
  } else {
    return Errorshandling.handleError(res, 422, 'Bad Parameter !!!', 'Mauvais paramètre ...');
  }
}
