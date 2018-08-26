import ArchiveDocument from './archive-document.model';
import GenericRepository from '../service/generic.repository';
import Errorshandling from '../service/errorshandling';

const ArchiveDocumentRepository = new GenericRepository(ArchiveDocument);

export async function saveArchiveDocument(archiveDocument, res) {
  let storeArchiveDocument = null;
  archiveDocument = new ArchiveDocument(archiveDocument);
  try {
    storeArchiveDocument = await ArchiveDocumentRepository.save(archiveDocument);
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur Server');
  }
  return storeArchiveDocument;
}

export async function getAllArchiveDocument(res) {
  let archiveDocument = [];
  try {
    archiveDocument = await ArchiveDocumentRepository.getAllPopulate({path: 'fichierJoint'});
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur Server');
  }
  return archiveDocument;
}

export async function getArchiveDocument(criteria, res) {
  let archiveDocument = null;
  try {
    archiveDocument = await ArchiveDocumentRepository.getAll(criteria, {path: 'fichierJoint'});
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
  }
  return archiveDocument;
}

export async function createArchiveDocument(req, res) {
  let archiveDocument = req.body.archiveDocument;
  let dateBody = req.body.archiveDocument.date;
  let libelleBody = req.body.archiveDocument.libelle;
  let descriptionBody = req.body.archiveDocument.description;
  let categorieBody = req.body.archiveDocument.categorie;
  let moduleBody = req.body.archiveDocument.module;
  let fichierJointBody = req.body.archiveDocument.fichierJoint;

  if(libelleBody && descriptionBody && categorieBody
    && moduleBody && fichierJointBody && dateBody) {
    let storeResponse = null;
    if(!fichierJointBody.length) {
      Errorshandling.handleError(res, 422, 'Bad Parameter', 'Veuillez renseigner tous les champs');
    }
    try {
      archiveDocument = new ArchiveDocument(archiveDocument);
      storeResponse = await ArchiveDocumentRepository.save(archiveDocument);
      return res.json({storeResponse});
    } catch(error) {
      Errorshandling.handleError(res, error.code, error, 'Erreur Interne');
    }
  } else {
    Errorshandling.handleError(res, 422, 'Bad Parameter !!!', 'Mauvais paramètre !!!');
  }
}

export async function updateArchiveDocument(req, res) {
  let idParams = req.params.id;
  let dateBody = req.body.archiveDocument.date;
  let libelleBody = req.body.archiveDocument.libelle;
  let descriptionBody = req.body.archiveDocument.description;
  let categorieBody = req.body.archiveDocument.categorie;
  let moduleBody = req.body.archiveDocument.module;
  let fichierJointBody = req.body.archiveDocument.fichierJoint;

  if(libelleBody && descriptionBody && categorieBody
    && moduleBody && fichierJointBody && dateBody) {
    let updateResponse = null;
    if(!fichierJointBody.length) {
      Errorshandling.handleError(res, 422, 'Bad Parameter', 'Veuillez renseigner tous les champs');
    }

    try {
      updateResponse = await ArchiveDocumentRepository.getOne(idParams);
    } catch(error) {
      Errorshandling.handleError(res, error.code, error, 'Erreur Interne');
    }

    if(updateResponse) {
      updateResponse.date = dateBody;
      updateResponse.libelle = libelleBody;
      updateResponse.description = descriptionBody;
      updateResponse.categorie = categorieBody;
      updateResponse.module = moduleBody;
      updateResponse.fichierJoint = fichierJointBody;
      try {
        updateResponse = await saveArchiveDocument(updateResponse);
        return res.json({updateResponse});
      } catch(error) {
        Errorshandling.handleError(res, error.code, error, 'Erreur Interne');
      }
    } else {
      Errorshandling.handleError(res, 422, 'This Archive doesn\'t exist', 'Cette archive n\'existe pas');
    }
  } else {
    Errorshandling.handleError(res, 422, 'Bad Parameter !!!', 'Mauvais paramètre !!!');
  }
}

export async function getAll(req, res) {
  try {
    let archives = null;
    archives = await getAllArchiveDocument();
    if(!archives) {
      archives = [];
    }
    return res.json({archives});
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
  }
}

export async function getByCriteria(req, res) {
  let moduleArchive = req.params.module;
  if(moduleArchive) {
    try {
      let archives = await getArchiveDocument({module: moduleArchive});
      if(!archives) {
        archives = [];
      }
      return res.json({archives});
    } catch(error) {
      return Errorshandling.handleError(res, 500, error, 'Erreur Serveur !!!');
    }
  } else {
    return Errorshandling.handleError(res, 422, 'Bad Parameter !!!', 'Mauvais paramètre ...');
  }
}
