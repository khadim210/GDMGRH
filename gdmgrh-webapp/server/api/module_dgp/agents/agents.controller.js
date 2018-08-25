'use strict';

import Agent from './agents.model';
import GenericRepository from '../../service/generic.repository';
import Errorshandling from '../../service/errorshandling';

//const DiplomeRepository = new GenericRepository(Agent);
const AgentRepository = new GenericRepository(Agent);

/*export async function getalldiplomes(req, res) {
    try {
        var allDiplomes = await DiplomeRepository.getAll();
        return res.status(200).json({diplomes: allDiplomes});
    } catch (error) {
        return Errorshandling.handleError(res, 500, error, 'Erreur serveur (Mauvaise requete) !!!');
    } 
}

export async function getcivildiplomes(req, res) {
    try {
        var allcivilDiplomes = await DiplomeRepository.getAll({typediplome: 'Diplome Civil'});
        return res.status(200).json({diplomes: allcivilDiplomes});
    } catch (error) {
        return Errorshandling.handleError(res, 500, error, 'Erreur serveur (Mauvaise requete) !!!');
    }
}

export async function getmilidiplomes(req, res) {
    try {
        var allmiliDiplomes = await DiplomeRepository.getAll({typediplome: 'Diplome Militaire'});
        return res.status(200).json({diplomes: allmiliDiplomes});
    } catch (error) {
        return Errorshandling.handleError(res, 500, error, 'Erreur serveur (Mauvaise requete) !!!');
    }
}
*/

export async function getagents(req, res) {
    try {
        var allagents = await AgentRepository.getAll();
        return res.status(200).json({agents: allagents});
    } catch (error) {
        return Errorshandling.handleError(res, 500, error, 'Erreur serveur (Mauvaise requete) !!!');
    }
}

export async function getoneagent(req, res) {
    try {
        var oneagent = await AgentRepository.getOne(req.params.id);
        return res.status(200).json({agent: oneagent});
    } catch (error) {
        return Errorshandling.handleError(res, 500, error, 'Erreur serveur (Mauvaise requete) !!!');
    }
}

/**
 * 
 */

export async function addgendarme(req, res) {
    console.log('req.body:');
    console.log(req.body.langues);
    //if(nom && nomcourt && niveauequivalent) {
        var agentParams = {
            matricule: req.body.matricule,
            civilite: req.body.civilite,
            name: req.body.nom+' '+req.body.prenom,
            nom: req.body.nom,
            prenom: req.body.prenom,
            datenaissance: req.body.datenaissance,
            lieunaissance: req.body.lieunaissance,
            filiation: req.body.filiation,
            dateentreeservice: req.body.dateentreeservice,
            dateliberation: req.body.dateliberation,
            grade: req.body.grade,
            service: req.body.service,
            diplome: req.body.diplome,
            libellediplome: req.body.libellediplome,
            specialite: req.body.specialite,
            stages: req.body.stages,
            permis_conduire: req.body.permis_conduire,
            langues: req.body.langues,
            personnes_prevenir: req.body.personnes_prevenir,
            datemariage: req.body.datemariage,
            nomconjoint: req.body.nomconjoint,
            datenaissanceconjoint: req.body.datenaissanceconjoint,
            lieunaissanceconjoint: req.body.lieunaissanceconjoint,
            datedivorce: req.body.datedivorce,
            suivant: req.body.suivant,
            dateremariage: req.body.dateremariage,
            nom_conjoint: req.body.nom_conjoint,
            datenaissance_conjoint: req.body.datenaissance_conjoint,
            lieunaissance_conjoint: req.body.lieunaissance_conjoint,
        };
        console.log(agentParams);
        var agent = new Agent(agentParams);
        try {
            var agentSave = await AgentRepository.save(agent);
            return res.status(200).json({response: agentSave}); 
        } catch (error) {
            return Errorshandling.handleError(res, 500, error, 'Erreur serveur (Mauvaise requete) !!!');
        }
    //} else {
    //    return Errorshandling.handleError(res, 500, 'Bad params', 'Mauvaise paramètre !!!');
    //}
} 


 
export async function editgendarme(req, res) {
    console.log('req.body:');
    console.log(req.body.langues);
    //if(nom && nomcourt && niveauequivalent) {
        var agentParams = {
            matricule: req.body.matricule,
            civilite: req.body.civilite,
            name: req.body.nom+' '+req.body.prenom,
            nom: req.body.nom,
            prenom: req.body.prenom,
            datenaissance: req.body.datenaissance,
            lieunaissance: req.body.lieunaissance,
            filiation: req.body.filiation,
            dateentreeservice: req.body.dateentreeservice,
            dateliberation: req.body.dateliberation,
            grade: req.body.grade,
            service: req.body.service,
            diplome: req.body.diplome,
            libellediplome: req.body.libellediplome,
            specialite: req.body.specialite,
            stages: req.body.stages,
            permis_conduire: req.body.permis_conduire,
            langues: req.body.langues,
            personnes_prevenir: req.body.personnes_prevenir,
            datemariage: req.body.datemariage,
            nomconjoint: req.body.nomconjoint,
            datenaissanceconjoint: req.body.datenaissanceconjoint,
            lieunaissanceconjoint: req.body.lieunaissanceconjoint,
            datedivorce: req.body.datedivorce,
            suivant: req.body.suivant,
            dateremariage: req.body.dateremariage,
            nom_conjoint: req.body.nom_conjoint,
            datenaissance_conjoint: req.body.datenaissance_conjoint,
            lieunaissance_conjoint: req.body.lieunaissance_conjoint,
        };
        console.log(agentParams);
        var agent = new Agent(agentParams);
        try {
            var agentSave = await AgentRepository.save(agent);
            return res.status(200).json({response: agentSave}); 
        } catch (error) {
            return Errorshandling.handleError(res, 500, error, 'Erreur serveur (Mauvaise requete) !!!');
        }
    //} else {
    //    return Errorshandling.handleError(res, 500, 'Bad params', 'Mauvaise paramètre !!!');
    //}
} 

/*
export async function editdiplome(req, res) {
    var diplomeParams = req.body;
    var diplome_id = req.params.id;
    if(diplomeParams && diplome_id) {
        try {
            console.log('ok');
            var diplome = await DiplomeRepository.getOneBy({_id: diplome_id});
            if (diplomeParams.nom) {
                diplome.nom = diplomeParams.nom;
            }
            if (diplomeParams.nomcourt) {
                diplome.nomcourt = diplomeParams.nomcourt;
            }
            if (diplomeParams.niveau) {
                diplome.niveauequivalent = diplomeParams.niveau;
            }
            if (diplomeParams.typediplome) {
                diplome.typediplome = diplomeParams.typediplome;
            }
            if (diplomeParams.specialite) {
                diplome.specialite = diplomeParams.specialite;
            }
            var allDiplomes = await DiplomeRepository.save(diplome);
            res.status(200).json({response: allDiplomes});
        } catch (error) {
            return Errorshandling.handleError(res, 500, error, 'Erreur serveur (Mauvaise requete) !!!');
        }
    } else {
        return Errorshandling.handleError(res, 500, 'This diplome allready exist', 'Ce diplôme n\'existe pas !');
    }  
}

export async function deletediplome(req, res) {
    var id = req.params.id;
    try{
        var diplome = await DiplomeRepository.remove({_id: id});
        res.status(200).json({response: diplome});
    } catch (error){
        return Errorshandling.handleError(res, 500, error, 'Erreur serveur (Mauvaise requete) !!!');
    }
}
*/

