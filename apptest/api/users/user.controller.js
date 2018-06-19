const User = require('./user.model');
var AgentController = require('../agent/agent.controller');
var GenericRepository = require('../service/generic.repository');

const UserRepository = new GenericRepository(User);
const AgentControllers = new AgentController();  

function userController () {

    this.getAllUserBy = async (res, criteria = {}) => {
        try {
            var allUser = await UserRepository.getAll(criteria);
            return allUser;
        } catch (error) {
            return res.json({response: 'Bad request'});
        }
    }

    this.getDataUser = async (req, res) => {
        try {
            var agent = await AgentControllers.getAllAgent({access: false});
            return res.json({response: agent});
        } catch (error) {
            console.log(error);
            return res.json({response: 'Bad request'});
        }
    }

    /**
     * 
     */
    this.addUser = async (req, res) => {
        var agent_id = req.body.agent;
        var rule = req.body.rule;
        var username = req.body.username;
        var password = req.body.password;
        if(username && password && agent_id && rule) {
            var userParams = {
                agent : agent_id,
                rule: rule,
                username: username,
                password: password
            };
            var user = new User(userParams);
            try {
                user = await UserRepository.save(user);
                if(user) {
                    user = await UserRepository.getAllPopulate('agent');
                }
                var agent = await AgentControllers.getOneAgent(userParams.agent);
                agent.access = true;
                agent = await AgentControllers.createAgent(agent);
                agent = await AgentControllers.getAllAgent({access: false});
                return res.status(200).json({user, agent});   
            } catch (error) {
                console.log(error)
                return res.json({response: 'Bad request POST USER'});
            }
        } else {
            return res.json({response: 'Bad params POST USER'});
        }
    }

    this.getAllUser = async (req, res) => {
        try {
            var allUser = await UserRepository.getAllPopulate('agent');

            return res.status(200).json({response: allUser});
        } catch (error) {
            return res.json({response: 'Bad request GET USER'});
        } 
    }
    
    this.getOneUser = async (req, res) => {
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

    this.updateUser = async (req, res) => {
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
                user.rule = userParams.rule;
                user.agent = userParams.agent;
                if(userParams.password) {
                    user.password = userParams.password;
                }
                user.status = userParams.status;
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
}

module.exports = userController;
