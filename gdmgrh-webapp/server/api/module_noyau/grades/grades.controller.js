'use strict';

import Grade from './grades.model';
import Niveau from './niveaux.model';
import Categorie from './categories.model';
import GenericRepository from '../../service/generic.repository';
import Errorshandling from '../../service/errorshandling';

const GradeRepository = new GenericRepository(Grade);
const NiveauRepository = new GenericRepository(Niveau);
const CategorieRepository = new GenericRepository(Categorie);

export async function getallcategories(req, res) {
    try {
        var allCategories = await CategorieRepository.getAll();
        return res.status(200).json({categories: allCategories});
    } catch (error) {
        return Errorshandling.handleError(res, 500, error, 'Erreur serveur (Mauvaise requete) !!!');
    } 
}

export async function getallniveaux(req, res) {
    try {
        var allNiveaux = await NiveauRepository.getAll();
        return res.status(200).json({niveaux: allNiveaux});
    } catch (error) {
        return Errorshandling.handleError(res, 500, error, 'Erreur serveur (Mauvaise requete) !!!');
    } 
}

export async function getallgrades(req, res) {
    try {
        var allGrades = await GradeRepository.getAllPopulate('niveau categorie');
        return res.status(200).json({grades: allGrades});
    } catch (error) {
        return Errorshandling.handleError(res, 500, error, 'Erreur serveur (Mauvaise requete) !!!');
    } 
}

/**
 * 
 */
export async function addgrade(req, res) {
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
} 

export async function deletegrade(req, res) {
    var id = req.params.id;
    try{
        console.log(id);
        var grade = await GradeRepository.remove({_id: id});
        res.status(200).json({response: grade});
    } catch (error){
        res.json({response: 'Bad request'});
    }
}

/*
    editdiplome export async function(req, res) {
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
    }

    deletediplome export async function(req,res) => {
        var id = req.params.id;
        try{
            var diplome = await DiplomeRepository.remove({_id: id});
            res.status(200).json({response: diplome});
        } catch (error){
            res.json({response: 'Bad request'});
        }
    }
*/


