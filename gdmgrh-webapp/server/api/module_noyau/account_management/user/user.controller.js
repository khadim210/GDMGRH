'use strict';

import User from './user.model';
import * as AuthService from '../../../service/auth.service';
import * as AgentControllers from '../agent/agent.controller';
import * as GroupControllers from '../group/groupe.controller';
import GenericRepository from '../../../service/generic.repository';

// User Repository
const UserRepository = new GenericRepository(User); 


// Get User by criteria 
export async function getAllUserBy (res, criteria = {}) {
    try {
        return await UserRepository.getAll(criteria);
    } catch (error) {
        return res.json({error: 'Bad request'});
    }
}

//
export async function getDataUser (req, res) {
    try {
        var agent = await AgentControllers.getAllAgent({access: false});
        return res.json({response: agent});
    } catch (error) {
        console.log(error);
        return res.json({error: 'Bad request'});
    }
}

//
export async function addUser(req, res) {
    var agent_id = req.body.agent;
    var role = req.body.role;
    var username = req.body.username;
    var password = req.body.password;
    if(username && password && agent_id && role) {
        var agent = null;
        var userParams = {
            agent : agent_id,
            role: role,
            username: username,
            password: password
        };
        try {
            if(await UserRepository.getOneBy({username: userParams.username})) {
                return res.json({error: 'Nom d\'utilisateur exist déjà'});
            } else {
                var user = new User(userParams);
                agent = await AgentControllers.getOneAgent(user.agent);
                if(!agent) {
                    return res.json({error: 'Agent selectionné n\'existe pas'});
                }
                user = await UserRepository.save(user);
                if(user) {
                    user = await UserRepository.getAllPopulate('agent');
                }
                agent.access = true;
                agent = await AgentControllers.createAgent(agent);
                agent = await AgentControllers.getAllAgent({access: false});
                return res.status(200).json({user, agent});
            }
        } catch (error) {
            console.log(error)
            return res.json({error: 'Bad request POST USER'});
        }
    } else {
        return res.json({error: 'Bad params POST USER'});
    }
}

// Get all users with their respective agent
export async function getAllUser (req, res) {
    try {
        var allUser = await UserRepository.getAllPopulate('agent');

        return res.status(200).json({response: allUser});
    } catch (error) {
        console.log(error)
        return res.json({error: 'Bad request GET USER'});
    } 
}

//
export async function getOneUser (req, res) {
    var id = req.params.id;
    if(id) {
        try {
            var allUser = await UserRepository.getOne(id);
            return res.status(200).json({response: allUser});
        } catch (error) {
            return res.json({error: 'Bad request GET ONE USER'});
        }
    } else {
        return res.json({error: 'User doesn\'t exist !!!'});
    } 
}

// Update User profile
export async function updateUser (req, res) {
    var agent = null;
    var user = null;
    var userParams = req.body;
    var id = req.params.id;
    if(userParams && id) {
        try {
            user = await UserRepository.getOne(id);
            agent = await AgentControllers.getOneAgent(user.agent);
            agent.access = false;
            agent = await AgentControllers.createAgent(agent);
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
                agent = await AgentControllers.getOneAgent(userParams.agent);
                agent.access = true;
                agent = await AgentControllers.createAgent(agent);
                agent = await AgentControllers.getAllAgent({access: false});
            }
            return res.status(200).json({user, agent});
        } catch (error) {
            return res.json({error: 'Bad request PUT USER'});
        }
    } else {
        return res.json({error: 'User doesn\'t exist !!!'});
    }
}

// Sign-in
export async function signin (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var user = null;
    var agent = null;
    var group = null;
    if(username && password) {
        try {
            user = await UserRepository.getOneBy({username: username}, '_id username salt hashedPassword agent provider active created updated role');
        } catch (error) {
            console.log(error);
            return res.json({error: 'Mauvaise requête, veuillez contacter l\'administrateur !!!'});
        }
        if(user === null || !user.verifyPassword(password)) {
            return res.json({error: 'Nom d\'utilisateur ou mot de passe incorrect, en cas d\'oublie veuillez contacter l\'administrateur !!!'});
        }
        if(!user.active) {
            return res.json({error: 'Identifiant revoquer, veuillez contacter l\'administrateur !!!'});
        }

        try {
            group = await GroupControllers.getGroupBy({users: user._id});
        } catch (error) {
            console.log(error);
            return res.json({error: 'Erreur serveur, veuillez contacter l\'administrateur !!!'});
        }

        console.log(group);
        if(user.agent) {
            try {
                agent = await AgentControllers.getOneAgent(user.agent);
            } catch (error) {
                console.log(error);
                return res.json({error: 'Erreur serveur, veuillez contacter l\'administrateur !!!'});
            }

            var token = AuthService.signToken(user._id, user.role);
            return res.json({response: {
                _id: user._id,
                username: user.username,
                agent: agent,
                token: token,
                role: user.role,
                created: user.created,
                updated: user.updated
            }});
        } else {
            return res.json({response: {
                _id: user._id,
                username: user.username,
                agent: agent,
                token: AuthService.signToken(user._id, user.role),
                role: user.role,
                created: user.created,
                updated: user.updated
            }});
        }
    } else {
        return res.json({error: 'Mauvaise requête, veuillez contacter l\'administrateur !!!'});
    }
}
