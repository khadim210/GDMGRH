var Agent = require('./agent.model');
var GenericRepository = require('../service/generic.repository');

const AgentRepository = new GenericRepository(Agent);

function agentController() {
    this.createAgent = async (agent) => {
        var agentStorage = null;
        if(agent) {
            agent = new Agent(agent);
            agentStorage = await AgentRepository.save(agent);
            return agentStorage;
        } else {
            console.log(error);
        }
        return agentStorage;
    }

    this.getAllAgent = async (criteria = null) => {
        var agent = [];
        try {
            agent = await AgentRepository.getAll(criteria);
        } catch (error) {
            console.log(error);
        }
        return agent;
    }

    this.getOneAgent = async (id) => {
        var agent = null;
        try {
            agent = await AgentRepository.getOne(id);
        } catch (error) {
            console.log(error);
        }
        return agent;
    }
}

module.exports = agentController;
