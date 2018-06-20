const Diplome = require('./diplome.model');
var GenericRepository = require('../service/generic.repository');
var ObjectId = require('mongodb').ObjectId;

const DiplomeRepository = new GenericRepository(Diplome);

module.exports = {

    getalldiplomes : async (req, res) => {
        try {
            var lesdiplomes = [];
            var allDiplomes = await DiplomeRepository.getAll();
            return res.status(200).json({diplomes: allDiplomes});
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
        if(nom && nomcourt && niveauequivalent) {
            var diplomeParams = {
                nom : nom,
                nomcourt: nomcourt,
                niveauequivalent: niveauequivalent,
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
        console.log(diplome_id);
        if(diplomeParams && diplome_id) {
            try {
                console.log('ok');
                var diplome = await DiplomeRepository.getOneBy({_id: diplome_id});
                console.log(diplome);
                if (diplomeParams.nom) {
                    diplome.nom = diplomeParams.nom;
                }
                if (diplomeParams.nomcourt) {
                    diplome.nomcourt = diplomeParams.nomcourt;
                }
                if (diplomeParams.niveau) {
                    diplome.niveauequivalent = diplomeParams.niveau;
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
        console.log(id);
        try{
            var diplome = await DiplomeRepository.remove({_id: id});
            res.status(200).json({response: diplome});
        } catch (error){
            res.json({response: 'Bad request'});
        }
    }

}
