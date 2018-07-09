'use strict';

import User from './user.model';
import * as AuthService from '../../../service/auth.service';
import * as AgentControllers from '../agent/agent.controller';
import * as GroupControllers from '../group/groupe.controller';
import GenericRepository from '../../../service/generic.repository';

// User Repository
const UserRepository = new GenericRepository(User);


// Get User by criteria
export async function getAllUserBy(res, criteria = {}) {
  try {
    return await UserRepository.getAllPopulate('agent', criteria);
  } catch(error) {
    return res.json({error: 'Bad request'});
  }
}

//
export async function getDataUser(req, res) {
  try {
    var agent = await AgentControllers.getAllAgent({access: false});
    var groupe = await GroupControllers.getGroupBy(res, {status: 'actif'});
    return res.json({agent, groupe});
  } catch(error) {
    console.log(error);
    return res.json({error: 'Bad request'});
  }
}

//
export async function addUser(req, res) {
  var idAgent = req.body.agent;
  var bodyRole = req.body.role;
  var bodyUsername = req.body.username;
  var bodyPassword = req.body.password;
  var idGroupe = req.body.groupe;
  if(bodyUsername && bodyRole && idAgent && bodyPassword && idGroupe) {
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
        return res.json({error: 'Nom d\'utilisateur exist déjà'});
      } else {
        var user = new User(userParams);
        agent = await AgentControllers.getOneAgent(res, user.agent);
        if(!agent) {
          return res.json({error: 'Agent selectionné n\'existe pas'});
        }
        user = await UserRepository.save(user);
        if(user) {
          groupe = await GroupControllers.getOneGroupeBy(res, {_id: idGroupe});
          groupe = await GroupControllers.saveGroup(res, groupe);
          groupe = await GroupControllers.getAllGroupe(res);
          user = await UserRepository.getAllPopulate('agent');
        }
        agent.access = true;
        agent = await AgentControllers.storageAgent(agent);
        agent = await AgentControllers.getAllAgent({access: false});
        return res.status(200).json({user, agent, groupe});
      }
    } catch(error) {
      console.log(error);
      return res.json({error: 'Bad request POST USER'});
    }
  } else {
    return res.json({error: 'Bad params POST USER'});
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
    return res.json({error: 'Bad request GET USER'});
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
      return res.json({error: 'Bad request GET ONE USER'});
    }
  } else {
    return res.json({error: 'User doesn\'t exist !!!'});
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
      console.log(error);
      return res.json({error: 'Erreur serveur, veuillez contacter l\'administrateur !!!'});
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
      console.log(error);
      return res.json({error: 'Erreur serveur, veuillez contacter l\'administrateur !!!'});
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
      console.log(error);
      return res.json({error: 'Erreur serveur, veuillez contacter l\'administrateur !!!'});
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
      return res.json({error: 'Bad request PUT USER'});
    }
  } else {
    return res.json({error: 'User doesn\'t exist !!!'});
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
      return res.json({error: 'Mauvaise requête, veuillez contacter l\'administrateur !!!'});
    }
    if(user === null || !user.verifyPassword(password)) {
      return res.json({error: 'Nom d\'utilisateur ou mot de passe incorrect, en cas d\'oublie veuillez contacter l\'administrateur !!!'});
    }
    if(!user.active) {
      return res.json({error: 'Identifiant revoquer, veuillez contacter l\'administrateur !!!'});
    }

    try {
      group = await GroupControllers.getOneGroupeBy(res, {users: user._id});
    } catch(error) {
      return res.json({error: 'Erreur serveur, veuillez contacter l\'administrateur !!!'});
    }

    if(user.role === 'admin' && group === null) {
      group = {};
      group.moduleSelect = 'admin';
    }
    
    if(user.agent) {
      try {
        agent = await AgentControllers.getOneAgent(res, user.agent);
        console.log(agent);
      } catch(error) {
        console.log(error);
        return res.json({error: 'Erreur serveur, veuillez contacter l\'administrateur !!!'});
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
    return res.json({error: 'Mauvaise requête, veuillez contacter l\'administrateur !!!'});
  }
}
