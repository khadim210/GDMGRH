'use strict';

import User from './user.model';
import * as AuthService from '../../../service/auth.service';
import * as AgentControllers from '../agent/agent.controller';
import * as GroupControllers from '../group/groupe.controller';
import GenericRepository from '../../../service/generic.repository';
import Errorshandling from '../../../service/errorshandling';

// User Repository
const UserRepository = new GenericRepository(User);


// Get User by criteria
export async function getAllUserBy(res, criteria = {}) {
  try {
    return await UserRepository.getAllPopulate('agent', criteria);
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
  }
}

//
export async function getDataUser(req, res) {
  try {
    var agent = await AgentControllers.getAllAgent({access: false});
    var groupe = await GroupControllers.getGroupBy(res, {status: 'actif'});
    return res.json({agent, groupe});
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
  }
}

//
export async function addUser(req, res) {
  var idAgent = req.body.agent;
  var bodyRole = req.body.role;
  var bodyUsername = req.body.username;
  var bodyPassword = req.body.password;
  var idGroupe = req.body.groupe;
  if(bodyUsername && bodyRole && idAgent && bodyPassword) {
    var agent = null;
    var groupe = null;
    var userParams = {
      agent: idAgent,
      role: bodyRole,
      username: bodyUsername,
      password: bodyPassword
    };
    try {
      if(await UserRepository.getOneBy({username: userParams.username})) {
        return Errorshandling.handleError(res, 422, 'Username allready exist', 'Nom d\'utilisateur exist déjà');
      } else {
        var user = new User(userParams);
        agent = await AgentControllers.getOneAgent(res, user.agent);
        if(!agent) {
          return Errorshandling.handleError(res, 422, 'Agent doesn\'t exist', 'Agent selectionné n\'existe pas');
        }
        user = await UserRepository.save(user);
        if(idGroupe) {
          groupe = await GroupControllers.getOneGroupeBy(res, {_id: idGroupe});
          groupe.users.push(user._id);
          groupe = await GroupControllers.saveGroup(res, groupe);
        }
        groupe = await GroupControllers.getAllGroupe(res);
        user = await UserRepository.getAllPopulate('agent');
        agent.access = true;
        agent = await AgentControllers.storageAgent(agent);
        agent = await AgentControllers.getAllAgent({access: false});
        return res.status(200).json({user, agent, groupe});
      }
    } catch(error) {
      return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
    }
  } else {
    return Errorshandling.handleError(res, 422, 'Bad params POST USER', 'Mauvais paramètre !!!');
  }
}

// Get all users with their respective agent
export async function getAllUser(req, res) {
  try {
    var allUser = await UserRepository.getAllPopulate('agent');
    var groupe = await GroupControllers.getGroupBy(res, {status: 'actif'});
    var users = mergeUserIdGroup(allUser, groupe);
    return res.status(200).json({allUser, groupe, users});
  } catch(error) {
    return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
  }
}
function mergeUserIdGroup(userList = [], groupList = []) {
  var users = null;
  for(let indexGroupe = 0; indexGroupe < groupList.length; indexGroupe++) {
    users = checkUserExistGroupe(groupList[indexGroupe].users, userList, groupList[indexGroupe]._id);
  }
  return users;
}

function checkUserExistGroupe(groupUser = [], userList = [], idGroup) {
  for(let indexUserGroup = 0; indexUserGroup < groupUser.length; indexUserGroup++) {
    for(let indexUsers = 0; indexUsers < userList.length; indexUsers++) {
      if(groupUser[indexUserGroup]._id === userList[indexUsers]._id) {
        userList[indexUsers].groupe = idGroup;
      }
    }
  }
  return userList;
}

//
export async function getOneUser(req, res) {
  var id = req.params.id;
  if(id) {
    try {
      var allUser = await UserRepository.getOne(id);
      return res.status(200).json({response: allUser});
    } catch(error) {
      return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
    }
  } else {
    return Errorshandling.handleError(res, 422, 'User doesn\'t exist !!!', 'Le nom d\'utilisateur n\'existe pas !!!');
  }
}

// Update User profile
export async function updateUser(req, res) {
  var agent = null;
  var user = null;
  var groupe = null;
  var userParams = req.body;
  var id = req.params.id;
  if(userParams && id) {
    try {
      user = await UserRepository.getOne(id);
    } catch(error) {
      return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
    }

    try {
      groupe = await GroupControllers.getOneGroupeBy(res, {users: user._id});
      if(userParams.groupe.toString() !== groupe._id.toString()) {
        groupe.users = groupe.users.filter(_user => _user.toString() !== user._id.toString());
        groupe = await GroupControllers.saveGroup(res, groupe);
        groupe = await GroupControllers.getOneGroupeBy(res, {_id: userParams.groupe});
        groupe.users.push(user._id);
        groupe = await GroupControllers.saveGroup(res, groupe);
      }
    } catch(error) {
      return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
    }

    try {
      agent = await AgentControllers.getOneAgent(res, user.agent);
      if(agent._id.toString() !== userParams.agent.toString()) {
        agent.access = false;
        agent = await AgentControllers.storageAgent(agent);
        agent = await AgentControllers.getOneAgent(res, userParams.agent);
        agent.access = true;
        agent = await AgentControllers.storageAgent(agent);
      }
      agent = await AgentControllers.getAllAgent({access: false});
    } catch(error) {
      return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
    }

    try {
      user.role = userParams.role;
      user.agent = userParams.agent;
      if(userParams.password) {
        user.password = userParams.password;
      }
      user.active = userParams.active;
      user.username = userParams.username;
      user = await UserRepository.save(user);
      if(user) {
        user = await UserRepository.getAllPopulate('agent');
      }
      return res.status(200).json({user, agent});
    } catch(error) {
      console.log(error);
      return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
    }
  } else {
    return Errorshandling.handleError(res, 422, 'User doesn\'t exist !!!', 'Le nom d\'utilisateur n\'existe pas !!!');
  }
}

// Sign-in
export async function signin(req, res) {
  var bodyUsername = req.body.username;
  var password = req.body.password;
  var user = null;
  var agent = null;
  var group = null;
  if(bodyUsername && password) {
    try {
      user = await UserRepository.getOneBy({username: bodyUsername}, '_id username salt hashedPassword agent provider active created updated role');
    } catch(error) {
      return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
    }
    if(user === null) {
      return Errorshandling.handleError(res, 422, 'Trying to login a user with bad paramters', 'Nom d\'utilisateur'
                + 'ou mot de passe incorrect, en cas d\'oublie veuillez contacter l\'administrateur !!!');
    }

    if(!user.verifyPassword(password)) {
      return Errorshandling.handleError(res, 422, 'Trying to login a user with bad password', 'Nom d\'utilisateur'
                + 'ou mot de passe incorrect, en cas d\'oublie veuillez contacter l\'administrateur !!!');
    }

    if(!user.active) {
      return Errorshandling.handleError(res, 422, 'Access revoque',
                        'Identifiant revoquer, veuillez contacter l\'administrateur !!!');
    }

    try {
      group = await GroupControllers.getOneGroupeBy(res, {users: user._id});
    } catch(error) {
      return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
    }

    if(user.role === 'admin' && group === null) {
      group = {};
      group.moduleSelect = 'admin';
    }

    if(user.agent) {
      try {
        agent = await AgentControllers.getOneAgent(res, user.agent);
      } catch(error) {
        return Errorshandling.handleError(res, 500, error, 'Erreur serveur !!!');
      }

      var token = AuthService.signToken(user._id, user.role);
      return res.json({user: {
        _id: user._id,
        username: user.username,
        agent: agent,
        token: token,
        role: user.role,
        group: group.moduleSelect,
        created: user.created,
        updated: user.updated
      }});
    } else {
      return res.json({user: {
        _id: user._id,
        username: user.username,
        agent: null,
        token: AuthService.signToken(user._id, user.role),
        role: user.role,
        group: group.moduleSelect,
        created: user.created,
        updated: user.updated
      }});
    }
  } else {
    return Errorshandling.handleError(res, 422, 'Trying to login a user with bad paramters (usernme or/and password) ',
                      'Mauvaise requête, veuillez contacter l\'administrateur !!!');
  }
}
