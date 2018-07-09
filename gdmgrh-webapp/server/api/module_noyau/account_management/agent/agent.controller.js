import Agent from './agent.model';
import GenericRepository from '../../../service/generic.repository';

const AgentRepository = new GenericRepository(Agent);

export async function storageAgent(agent) {
  var agentStorage = null;
  try {
    agentStorage = await AgentRepository.save(agent);
    return agentStorage;
  } catch(error) {
    console.log(error);
  }
  return agentStorage;
}

export async function getAllAgent(criteria = null) {
  var agent = [];
  try {
    agent = await AgentRepository.getAll(criteria);
  } catch(error) {
    console.log(error);
  }
  return agent;
}

export async function getOneAgent(res, id) {
  var agent = null;
  try {
    agent = await AgentRepository.getOne({_id: id});
  } catch(error) {
    console.log(error);
    return res.json({error: 'Erreur serveur, veuillez contacter l\'administrateur !!!'});
  }
  return agent;
}
