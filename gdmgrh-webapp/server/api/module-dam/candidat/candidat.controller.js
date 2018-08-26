import Candidat from './candidat.model';
import * as ControllerPromotion from '../promotion/promotion.controller';
import GenericRepository from '../../service/generic.repository';
import Errorshandling from '../../service/errorshandling';

const CandidatRepository = new GenericRepository(Candidat);

export async function saveCandidat(candidat, res) {
  let storeCandidat = null;
  //candidat = new Candidat(candidat);
  try {
    storeCandidat = await CandidatRepository.save(candidat);
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur Server');
  }
  return storeCandidat;
}

export async function getAllCandidat(res) {
  let candidat = [];
  try {
    candidat = await CandidatRepository.getAllPopulate({path: 'fichierJoint'});
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur Server');
  }
  return candidat;
}

export async function getOneCandidat(criteria, res) {
  let candidat = null;
  try {
    candidat = await CandidatRepository.populateGetOneBy(criteria, {path: 'fichierJoint'});
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
  }
  return candidat;
}

export async function create(req, res) {
  let candidat = req.body.candidat;
  let promotionbody = req.body.promotion;
  let matriculebody = req.body.candidat.matricule;
  let nombody = req.body.candidat.nom;
  let prenombody = req.body.candidat.prenom;
  let cnibody = req.body.candidat.cni;
  let contactbody = req.body.candidat.contact;
  let emailbody = req.body.candidat.email;
  let genrebody = req.body.candidat.genre;
  let fichierJointbody = req.body.candidat.fichierJoint;
  let dateNaissancebody = req.body.candidat.dateNaissance;
  let dernierDiplomebody = req.body.candidat.dernierDiplome;
  let specialitebody = req.body.candidat.specialite;
  if(matriculebody && nombody && prenombody && cnibody && fichierJointbody
    && contactbody && genrebody && emailbody && dateNaissancebody
    && dernierDiplomebody && specialitebody) {
    let storeResponse = null;

    if(fichierJointbody.length < 2) {
      return Errorshandling.handleError(res, 422, 'Bad Parameter !!!', 'Veuillez inclure toutes les pièces y compris la photo');
    }

    try {
      storeResponse = await CandidatRepository.getOneBy({matricule: matriculebody});
    } catch(error) {
      return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
    }

    if(storeResponse) {
      return Errorshandling.handleError(res, 422, 'Try to create a candidat with a '
            + ' matricule that already exists', 'Un candidat existe déjà sous ce matricule');
    }

    try {
      storeResponse = await CandidatRepository.getOneBy({cni: cnibody});
    } catch(error) {
      return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
    }

    if(storeResponse) {
      return Errorshandling.handleError(res, 422, 'Try to create a candidat with a '
            + ' cni that already exists', 'Un candidat existe déjà sous cette cni');
    }

    let promotion = null;
    if(promotionbody) {
      try {
        promotion = await ControllerPromotion.getOnePromotion({_id: promotionbody});
      } catch(error) {
        return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
      }
    }

    try {
      candidat = new Candidat(candidat);
      storeResponse = await CandidatRepository.save(candidat);
      promotion.candidats.push(storeResponse._id);
      promotion = await savePromo(promotion, res);
      storeResponse = await getAllCandidat(res);
      storeResponse = await getAllCandidat(res);
      promotion = await ControllerPromotion.getAllPromotions(res);
      return res.json({storeResponse, promotion});
    } catch(error) {
      return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
    }
  } else {
    return Errorshandling.handleError(res, 422, 'Bad Parameter !!!', 'Veuillez renseignez tous les paramètres');
  }
}

export async function update(req, res) {
  let idbody = req.params.id;
  let promotionbody = req.body.promotion;
  let matriculebody = req.body.matricule;
  let nombody = req.body.nom;
  let prenombody = req.body.prenom;
  let cnibody = req.body.cni;
  let contactbody = req.body.contact;
  let emailbody = req.body.email;
  let genrebody = req.body.genre;
  let fichierJointbody = req.body.fichierJoint;
  let dateNaissancebody = req.body.dateNaissance;
  let dernierDiplomebody = req.body.dernierDiplome;
  let specialitebody = req.body.specialite;
  let statusbody = req.body.status;
  if(matriculebody && nombody && prenombody && cnibody && fichierJointbody
    && contactbody && genrebody && emailbody && dateNaissancebody
    && dernierDiplomebody && specialitebody && idbody) {
    let updateResponse = null;
    let promotion = null;

    if(fichierJointbody.length < 2) {
      return Errorshandling.handleError(res, 422, 'Bad Parameter !!!', 'Veuillez inclure toutes les pièces y compris la photo');
    }

    try {
      updateResponse = await CandidatRepository.getAll({matricule: matriculebody});
    } catch(error) {
      return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
    }

    if(!updateResponse) {
      return Errorshandling.handleError(res, 422, 'Try to create a candidat with a '
            + ' matricule that doesn\'t exists', 'ce matricule n\'existe pas pour ce candidat');
    }

    if(updateResponse.length >= 2) {
      return Errorshandling.handleError(res, 422, 'Try to create a candidat with a '
            + ' matricule that already exists', 'Un candidat existe déjà sous ce matricule');
    }

    try {
      updateResponse = await CandidatRepository.getAll({cni: cnibody});
    } catch(error) {
      return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
    }

    if(!updateResponse) {
      return Errorshandling.handleError(res, 422, 'Try to create a candidat with a '
            + ' cni that doesn\'t exists', 'ce cni n\'existe pas pour ce candidat');
    }

    if(updateResponse.length >= 2) {
      return Errorshandling.handleError(res, 422, 'Try to create a candidat with a '
            + ' cni that already exists', 'Un candidat existe déjà sous cette cni');
    }

    try {
      updateResponse = await CandidatRepository.getOneBy({_id: idbody});
    } catch(error) {
      return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
    }

    if(updateResponse) {
      if(promotionbody) {
        promotion = await delCandidatInPromo(promotionbody, idbody, res);
        try {
          promotion = await ControllerPromotion.getOnePromotion({_id: promotionbody});
          promotion.candidats.filter(_candidat => _candidat !== idbody);
          promotion = await savePromo(promotion, res);
        } catch(error) {
          return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
        }
      }
      updateResponse.matricule = matriculebody;
      updateResponse.nom = nombody;
      updateResponse.prenom = prenombody;
      updateResponse.cni = cnibody;
      updateResponse.contact = contactbody;
      updateResponse.email = emailbody;
      updateResponse.genre = genrebody;
      updateResponse.fichierJoint = fichierJointbody;
      if(statusbody) {
        updateResponse.status = statusbody;
      }
      updateResponse.dateNaissance = dateNaissancebody;
      updateResponse.dernierDiplome = dernierDiplomebody;
      updateResponse.specialite = specialitebody;
      try {
        updateResponse = await saveCandidat(updateResponse);
        updateResponse = await getAllCandidat(res);
        promotion = await ControllerPromotion.getAllPromotions(res);
        return res.json({updateResponse, promotion});
      } catch(error) {
        return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
      }
    } else {
      return Errorshandling.handleError(res, 422, 'This candidat doesn\'t existe !!!',
                'Ce candidat n\'existe pas');
    }
  } else {
    return Errorshandling.handleError(res, 422, 'Bad Parameter !!!', 'Mauvais paramètre ...');
  }
}

async function savePromo(promotion, res) {
  let storePromotion = null;
  try {
    storePromotion = await ControllerPromotion.savePromotion(promotion, res);
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
  }
  return storePromotion;
}

async function delCandidatInPromo(idCurentPromo, idCandidat, res) {
  let idOldPromo = await getIdCurentPromotion(res, idCandidat);
  let promotion = null;
  if(idOldPromo) {
    if(!(idOldPromo === idCurentPromo)) {
      try {
        promotion = await ControllerPromotion.getOnePromotion(idOldPromo);
        promotion.candidats = promotion.candidats.filter(_candidat => _candidat._id.toString() !== idCandidat.toString());
        promotion = await savePromo(promotion, res);
      } catch(error) {
        return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
      }
    }
  }
  return promotion;
}

async function getIdCurentPromotion(idCandidat, res) {
  let promotion = null;
  try {
    promotion = await ControllerPromotion.allPromotion();
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
  }
  if(!promotion) {
    return Errorshandling.handleError(res, 500, 'No Promotion', 'Veuillez d\'abord créer une promotion !!!');
  }
  for(let index = 0; index < promotion.length; index++) {
    const candidat = promotion[index].candidats;
    for(let key = 0; key < candidat.length; key++) {
      if(candidat._id === idCandidat) {
        return promotion[index]._id;
      }
    }
  }
  return null;
}

export async function getAll(req, res) {
  try {
    let candidats = null;
    candidats = await CandidatRepository.getAllPopulate({path: 'fichierJoint'});
    if(!candidats) {
      candidats = [];
    }
    return res.json({candidats});
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
  }
}

export async function getOne(req, res) {
  let cniCandidat = req.params.cni;
  if(cniCandidat) {
    try {
      let candidat = await getOneCandidat({cni: cniCandidat});
      return res.json({candidat});
    } catch(error) {
      return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
    }
  } else {
    return Errorshandling.handleError(res, 422, 'Bad Parameter !!!', 'Mauvais paramètre ...');
  }
}
