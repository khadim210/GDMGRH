import Groupe from './groupe.model';
import GenericRepository from '../../../service/generic.repository';
import Errorshandling from '../../../service/errorshandling';
import * as UserController from '../user/user.controller';

const GroupeRepository = new GenericRepository(Groupe);

export async function getGroupBy(res, criteria) {
  var group = null;
  try {
    group = await GroupeRepository.getAll(criteria);
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
  }
  return group;
}

export async function getOneGroupeBy(res, criteria) {
  var groupe = null;
  try {
    groupe = await GroupeRepository.getOneBy(criteria);
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
  }
  return groupe;
}

export async function saveGroup(res, groupe) {
  var returnGroup = null;
  groupe = new Groupe(groupe);
  try {
    returnGroup = await GroupeRepository.save(groupe);
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
  }
  return returnGroup;
}

export async function getAllGroupe(res) {
  var groupe = null;
  try {
    groupe = await GroupeRepository.getAllPopulate('users');
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
  }
  return groupe;
}

  /**
   * Groupe User
   */

export async function getGoupData(req, res) {
  try {
    var allUser = await UserController.getAllUserBy(res, {active: true});
    return res.status(200).json({response: allUser});
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
  }
}

export async function createUserGroupe(req, res) {
  var name = req.body.name;
  var description = req.body.description;
  var modules = req.body.moduleSelect;
  var users = req.body.users;
  if(!users) {
    users = [];
  }
  if(name && description && modules) {
    var groupe = {
      name: name,
      description: description,
      users: users,
      moduleSelect: modules,
      created: Date.now()
    };
    groupe = new Groupe(groupe);
    try {
      groupe = await GroupeRepository.save(groupe);
      groupe = await GroupeRepository.getAllPopulate('users');
    } catch(error) {
      return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
    }
    return res.json({response: groupe});
  } else {
    return Errorshandling.handleError(res, 422, 'Bad parameter for POST request !!!', 'Syntaxe de la requête erronée !!!');
  }
}

export async function getAllUserGroupe(req, res) {
  var groupe = null;
  try {
    groupe = await getAllGroupe(res);
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
  }
  return res.json({response: groupe});
}

export async function getOneUserGroupe(req, res) {
  var idGroupe = req.params._id;
  var groupe = null;
  if(idGroupe) {
    try {
      groupe = await GroupeRepository.getOneBy({_id: idGroupe});
    } catch(error) {
      return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
    }
    return res.json({response: groupe});
  } else {
    return Errorshandling.handleError(res, 422, 'Bad parameter for Get request !!!', 'Syntaxe de la requête erronée !!!');
  }
}

export async function updateUserGroupe(req, res) {
  var id = req.params._id;
  var name = req.body.name;
  var description = req.body.description;
  var users = req.body.users;
  var modules = req.body.moduleSelect;
  var status = req.body.status;
  var groupe = null;
  if(name && description && users.length && modules && status && id) {
    try {
      groupe = await GroupeRepository.getOneBy({_id: id});
      groupe.name = name;
      groupe.description = description;
      groupe.moduleSelect = modules;
      groupe.users = users;
      groupe.status = status;
      groupe = await GroupeRepository.save(groupe);
      groupe = await GroupeRepository.getAllPopulate('users');
    } catch(error) {
      return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
    }
    return res.json({response: groupe});
  } else {
    return Errorshandling.handleError(res, 422, 'Bad parameter for PUT request !!!', 'Syntaxe de la requête erronée !!!');
  }
}
