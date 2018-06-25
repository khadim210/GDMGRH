'use strict';

import User from './user.model';
import * as AgentControllers from '../agent/agent.controller';
import GenericRepository from '../../../service/generic.repository';


const UserRepository = new GenericRepository(User); 

export async function getAllUserBy (res, criteria = {}) {
    try {
        var allUser = await UserRepository.getAll(criteria);
        return allUser;
    } catch (error) {
        return res.json({response: 'Bad request'});
    }
}

export async function getDataUser (req, res) {
    try {
        var agent = await AgentControllers.getAllAgent({access: false});
        return res.json({response: agent});
    } catch (error) {
        console.log(error);
        return res.json({response: 'Bad request'});
    }
}

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
        var user = new User(userParams);
        try {
            if(await UserRepository.getOneBy({username: user.username})) {
                return res.json({response: 'User already exist'});
            } else {
                agent = await AgentControllers.getOneAgent(user.agent);
                if(!agent) {
                    return res.json({response: 'Agent doesn\'t exist'});
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
            return res.json({response: 'Bad request POST USER'});
        }
    } else {
        return res.json({response: 'Bad params POST USER'});
    }
}

export async function getAllUser (req, res) {
    try {
        var allUser = await UserRepository.getAllPopulate('agent');

        return res.status(200).json({response: allUser});
    } catch (error) {
        return res.json({response: 'Bad request GET USER'});
    } 
}

export async function getOneUser (req, res) {
    var id = req.params.id;
    if(id) {
        try {
            var allUser = await UserRepository.getOne(id);
            return res.status(200).json({response: allUser});
        } catch (error) {
            return res.json({response: 'Bad request GET ONE USER'});
        }
    } else {
        return res.json({response: 'User doesn\'t exist !!!'});
    } 
}

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
            return res.json({response: 'Bad request PUT USER'});
        }
    } else {
        return res.json({response: 'User doesn\'t exist !!!'});
    }  
}