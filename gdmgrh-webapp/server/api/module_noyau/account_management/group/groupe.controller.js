import Groupe from './groupe.model';
import GenericRepository from '../../../service/generic.repository';
import * as UserController from '../user/user.controller';

const GroupeRepository = new GenericRepository(Groupe);

export async function getGroupBy(res, criteria) {
  var group = null;
  try {
    group = await GroupeRepository.getAll(criteria);
  } catch(error) {
    console.log(error);
    return res.json({error: 'error on geting Groupe'});
  }
  return group;
}

export async function getOneGroupeBy(res, criteria) {
  var groupe = null;
  try {
    groupe = await GroupeRepository.getOneBy(criteria);
  } catch(error) {
    console.log(error);
    return res.json({error: 'error on geting one Groupe'});
  }
  return groupe;
}

export async function saveGroup(res, groupe) {
  var returnGroup = null;
  groupe = new Groupe(groupe);
  try {
    returnGroup = await GroupeRepository.save(groupe);
  } catch(error) {
    return res.json({response: 'error on saving groupe'});
  }
  return returnGroup;
}

export async function getAllGroupe(res) {
  var groupe = null;
  try {
    groupe = await GroupeRepository.getAllPopulate('users');
  } catch(error) {
    return res.json({error: 'error on getting all Groupe'});
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
    return res.json({error: 'Bad request'});
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
      console.log(error);
      return res.json({error: 'error on saving groupe'});
    }
    return res.json({response: groupe});
  } else {
    return res.json({error: 'Bad requestPOST !!!'});
  }
}

export async function getAllUserGroupe(req, res) {
  var groupe = null;
  try {
    groupe = await getAllGroupe(res);
  } catch(error) {
    return res.json({error: 'error on geting all Groupe'});
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
      return res.json({error: 'error on geting one Groupe'});
    }
    return res.json({response: groupe});
  } else {
    return res.json({error: 'Bad requestGet'});
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
      console.log(error);
      return res.json({error: 'error on saving groupe'});
    }
    return res.json({response: groupe});
  } else {
    return res.json({error: 'Bad request PUT!!!'});
  }
}
