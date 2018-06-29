'use strict';

import Grade from './grades.model';
import Niveau from './niveaux.model';
import Categorie from './categories.model';
import GenericRepository from '../../service/generic.repository';

const GradeRepository = new GenericRepository(Grade);
const NiveauRepository = new GenericRepository(Niveau);
const CategorieRepository = new GenericRepository(Categorie);

module.exports = {

    getallcategories : async (req, res) => {
        try {
            var allCategories = await CategorieRepository.getAll();
            return res.status(200).json({categories: allCategories});
        } catch (error) {
            return res.json({response: 'Mauvaise requete'});
        } 
    },

    getallniveaux : async (req, res) => {
        try {
            var allNiveaux = await NiveauRepository.getAll();
            return res.status(200).json({niveaux: allNiveaux});
        } catch (error) {
            return res.json({response: 'Mauvaise requete'});
        } 
    },

    getallgrades : async (req, res) => {
        try {
            var allGrades = await GradeRepository.getAllPopulate('niveau categorie');
            return res.status(200).json({grades: allGrades});
        } catch (error) {
            return res.json({response: 'Mauvaise requete'});
        } 
    },

    /**
     * 
     */
    addgrade : async (req, res) => {
        var categorie = req.body.categorie;
        var niveau = req.body.niveau;
        var nomgrade = req.body.nomgrade;
        var codegrade = req.body.codegrade;
        if(nomgrade && codegrade && categorie) {
            var gradeParams = {
                categorie: categorie,
                niveau: niveau,
                nomgrade: nomgrade,
                codegrade: codegrade
            };
            var grade = new Grade(gradeParams);
            try {
                var gradeSave = await GradeRepository.save(grade);
                return res.status(200).json({response: gradeSave}); 
            } catch (error) {
                res.json({response: 'Bad request'});
            }
        } else {
            return res.json({response: 'Bad params'});
        }
    }, 

    deletegrade : async(req,res) => {
        var id = req.params.id;
        try{
            console.log(id);
            var grade = await GradeRepository.remove({_id: id});
            res.status(200).json({response: grade});
        } catch (error){
            res.json({response: 'Bad request'});
        }
    },

/*
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
*/
}


