import Auxiliaire from './auxiliaire.model';
import GenericRepository from '../../service/generic.repository';
import Errorshandling from '../../service/errorshandling';

const AuxiliaireRepository = new GenericRepository(Auxiliaire);

export async function saveAuxiliaire(auxiliaire, res) {
  var storeAuxiliaire = null;
  auxiliaire = new Auxiliaire(auxiliaire);
  try {
    storeAuxiliaire = await AuxiliaireRepository.save(auxiliaire);
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur Server');
  }
  return storeAuxiliaire;
}

export async function getAllAuxiliaire(res) {
  var auxiliaire = [];
  try {
    auxiliaire = await AuxiliaireRepository.getAllWithPopulate({path: 'fichierJoint'}, {path: 'picture'});
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur Server');
  }
  return auxiliaire;
}

export async function getOneAuxiliaire(criteria, res) {
  var auxiliaire = null;
  try {
    auxiliaire = await AuxiliaireRepository.populateGetOneBy(criteria, {path: 'fichierJoint'});
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
  }
  return auxiliaire;
}

export async function create(req, res) {
  var auxiliaire = req.body.auxiliaire;
  var matriculebody = req.body.auxiliaire.matricule;
  var nombody = req.body.auxiliaire.nom;
  var prenombody = req.body.auxiliaire.prenom;
  var cnibody = req.body.auxiliaire.cni;
  var contactbody = req.body.auxiliaire.contact;
  var emailbody = req.body.auxiliaire.email;
  var genrebody = req.body.auxiliaire.genre;
  var fichierJointbody = req.body.auxiliaire.fichierJoint;
  var dateNaissancebody = req.body.auxiliaire.dateNaissance;
  var dernierDiplomebody = req.body.auxiliaire.dernierDiplome;
  var specialitebody = req.body.auxiliaire.specialite;
  if(matriculebody && nombody && prenombody && cnibody
    && contactbody && genrebody && emailbody && fichierJointbody
    && dateNaissancebody && dernierDiplomebody && specialitebody) {
    var storeResponse = null;

    if(fichierJointbody.length < 2) {
      return Errorshandling.handleError(res, 422, 'Bad Parameter !!!', 'Veuillez inclure toutes les pièces y compris la photo');
    }

    try {
      storeResponse = await AuxiliaireRepository.getOneBy({matricule: matriculebody});
    } catch(error) {
      return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
    }

    if(storeResponse) {
      return Errorshandling.handleError(res, 422, 'Try to create a auxiliaire with a '
            + ' matricule that already exists', 'L\'auxiliaire existe déjà sous ce matricule');
    }

    try {
      storeResponse = await AuxiliaireRepository.getOneBy({cni: cnibody});
    } catch(error) {
      return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
    }

    if(storeResponse) {
      return Errorshandling.handleError(res, 422, 'Try to create a auxiliaire with a '
            + ' cni that already exists', 'L\'auxiliaire existe déjà sous ce cni');
    }
    try {
      auxiliaire = new Auxiliaire(auxiliaire);
      storeResponse = await AuxiliaireRepository.save(auxiliaire);
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
    var auxiliaire = null;
    auxiliaire = await AuxiliaireRepository.getAllPopulate({path: 'fichierJoint'});
    return res.json({auxiliaire});
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
  }
}

export async function update(req, res) {
  var idbody = req.params.id;
  var matriculebody = req.body.auxiliaire.matricule;
  var nombody = req.body.auxiliaire.nom;
  var prenombody = req.body.auxiliaire.prenom;
  var cnibody = req.body.auxiliaire.cni;
  var contactbody = req.body.auxiliaire.contact;
  var emailbody = req.body.auxiliaire.email;
  var genrebody = req.body.auxiliaire.genre;
  var fichierJointbody = req.body.auxiliaire.fichierJoint;
  var dateNaissancebody = req.body.auxiliaire.dateNaissance;
  var dernierDiplomebody = req.body.auxiliaire.dernierDiplome;
  var specialitebody = req.body.auxiliaire.specialite;
  if(matriculebody && nombody && prenombody && cnibody
    && contactbody && genrebody && emailbody && fichierJointbody
    && dateNaissancebody && dernierDiplomebody && specialitebody) {
    var updateResponse = null;

    if(fichierJointbody.length < 2) {
      return Errorshandling.handleError(res, 422, 'Bad Parameter !!!', 'Veuillez inclure toutes les pièces y compris la photo');
    }

    try {
      updateResponse = await AuxiliaireRepository.getAll({matricule: matriculebody});
    } catch(error) {
      return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
    }

    if(!updateResponse) {
      return Errorshandling.handleError(res, 422, 'Try to create a Auxiliaire with a '
            + ' matricule that doesn\'t exists', 'ce matricule n\'existe pas pour ce auxiliaire');
    }

    if(updateResponse.length >= 2) {
      return Errorshandling.handleError(res, 422, 'Try to create a Auxiliaire with a '
            + ' matricule that already exists', 'Un Auxiliaire existe déjà sous ce matricule');
    }

    try {
      updateResponse = await AuxiliaireRepository.getAll({cni: cnibody});
    } catch(error) {
      return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
    }

    if(!updateResponse) {
      return Errorshandling.handleError(res, 422, 'Try to create a Auxiliaire with a '
            + ' cni that doesn\'t exists', 'ce cni n\'existe pas pour ce auxiliaire');
    }

    if(updateResponse.length >= 2) {
      return Errorshandling.handleError(res, 422, 'Try to create a Auxiliaire with a '
            + ' cni that already exists', 'Un Auxiliaire existe déjà sous cette cni');
    }

    try {
      updateResponse = await AuxiliaireRepository.getOne(idbody);
    } catch(error) {
      return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
    }

    if(updateResponse) {
      updateResponse.matricule = matriculebody;
      updateResponse.nom = nombody;
      updateResponse.prenom = prenombody;
      updateResponse.cni = cnibody;
      updateResponse.contact = contactbody;
      updateResponse.email = emailbody;
      updateResponse.genre = genrebody;
    //  updateResponse.fichierJoint = fichierJointbody;
      updateResponse.dateNaissance = dateNaissancebody;
      updateResponse.dernierDiplome = dernierDiplomebody;
      updateResponse.specialite = specialitebody;
      updateResponse = await saveAuxiliaire(updateResponse);
      return res.json({updateResponse});
    } else {
      return Errorshandling.handleError(res, 422, 'This Auxiliaire doesn\'t existe !!!',
                'Ce Auxiliaire n\'existe pas');
    }
  }
}


export async function getOne(req, res) {
  var cniAuxiliaire = req.params.cni;
  if(cniAuxiliaire) {
    try {
      var auxiliaire = await getOneAuxiliaire({cni: cniAuxiliaire});
      return res.json({auxiliaire});
    } catch(error) {
      return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
    }
  } else {
    return Errorshandling.handleError(res, 422, 'Bad Parameter !!!', 'Mauvais paramètre ...');
  }
}