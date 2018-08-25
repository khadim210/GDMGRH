'use strict';

import Diplome from './diplomes.model';
import GenericRepository from '../../service/generic.repository';
import Errorshandling from '../../service/errorshandling';

const DiplomeRepository = new GenericRepository(Diplome);

export async function getalldiplomes(req, res) {
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

/**
 * 
 */
export async function adddiplome(req, res) {
    var nom = req.body.nom;
    var nomcourt = req.body.nomcourt;
    var niveauequivalent = req.body.niveau;
    var typediplome = req.body.typediplome;
    if(nom && nomcourt && niveauequivalent) {
        var diplomeParams = {
            nom : nom,
            nomcourt: nomcourt,
            niveauequivalent: niveauequivalent,
            typediplome: typediplome,
        };
        var diplome = new Diplome(diplomeParams);
        try {
            var diplomeSave = await DiplomeRepository.save(diplome);
            return res.status(200).json({response: diplomeSave}); 
        } catch (error) {
            return Errorshandling.handleError(res, 500, error, 'Erreur serveur (Mauvaise requete) !!!');
        }
    } else {
        return Errorshandling.handleError(res, 500, 'Bad params', 'Mauvaise paramètre !!!');
    }
} 


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


