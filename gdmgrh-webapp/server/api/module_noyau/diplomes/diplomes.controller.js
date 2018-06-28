'use strict';

import Diplome from './diplomes.model';
import GenericRepository from '../../service/generic.repository';

const DiplomeRepository = new GenericRepository(Diplome);

module.exports = {

    getalldiplomes : async (req, res) => {
        try {
            var allDiplomes = await DiplomeRepository.getAll();
            return res.status(200).json({diplomes: allDiplomes});
        } catch (error) {
            return res.json({response: 'Mauvaise requete'});
        } 
    },

    getcivildiplomes : async (req, res) => {
        try {
            var allcivilDiplomes = await DiplomeRepository.getAll({typediplome: 'Diplome Civil'});
            return res.status(200).json({diplomes: allcivilDiplomes});
        } catch (error) {
            return res.json({response: 'Mauvaise requete'});
        }
    },

     getmilidiplomes : async (req, res) => {
        try {
            var allmiliDiplomes = await DiplomeRepository.getAll({typediplome: 'Diplome Militaire'});
            return res.status(200).json({diplomes: allmiliDiplomes});
        } catch (error) {
            return res.json({response: 'Mauvaise requete'});
        }
    },

    /**
     * 
     */
    adddiplome : async (req, res) => {
        var nom = req.body.nom;
        var nomcourt = req.body.nomcourt;
        var niveauequivalent = req.body.niveau;
        var typediplome = req.body.typediplome;
        var specialite = req.body.specialite;
        if(nom && nomcourt && niveauequivalent) {
            var diplomeParams = {
                nom : nom,
                nomcourt: nomcourt,
                niveauequivalent: niveauequivalent,
                typediplome: typediplome,
                specialite: specialite,
            };
            var diplome = new Diplome(diplomeParams);
            try {
                var diplomeSave = await DiplomeRepository.save(diplome);
                return res.status(200).json({response: diplomeSave}); 
            } catch (error) {
                res.json({response: 'Bad request'});
            }
        } else {
            return res.json({response: 'Bad params'});
        }
    }, 


    editdiplome : async (req, res) => {
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
                res.json({response: 'Bad request'});
            }
        } else {
            res.json({response: 'Ce diplôme n\'existe pas !'});
        }  
    },

    deletediplome : async(req,res) => {
        var id = req.params.id;
        try{
            var diplome = await DiplomeRepository.remove({_id: id});
            res.status(200).json({response: diplome});
        } catch (error){
            res.json({response: 'Bad request'});
        }
    }

}


