import Agent from './agent.model';
import GenericRepository from '../../../service/generic.repository';

const AgentRepository = new GenericRepository(Agent);

export async function createAgent (agent) {
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

export async function getAllAgent (criteria = null) {
    var agent = [];
    try {
        agent = await AgentRepository.getAll(criteria);
    } catch (error) {
        console.log(error);
    }
    return agent;
}

export async function getOneAgent (id) {
    var agent = null;
    try {
        agent = await AgentRepository.getOne(new Agent({_id: id}));
    } catch (error) {
        console.log(error);
    }
    return agent;
}