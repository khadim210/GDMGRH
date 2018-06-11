const Punition = require('./punition.model');
var GenericRepository = require('../service/generic.repository');

const PunitionRepository = new GenericRepository(Punition);

module.exports = {

    addPunition : async (req, res) => {
        var nature = req.body.nature;
        var categorie_sous_officier = req.body.categorie_sous_officier;
        var libelle_punition = req.body.libelle_punition

        if(nature && libelle_punition && categorie_sous_officier) {
            var punitionParams = {
                nature : nature,
                categorie_sous_officier: categorie_sous_officier,
                libelle_punition: libelle_punition
            };
            var punition = new Punition(punitionParams);
            try {
                var punitionSave = await PunitionRepository.save(punition);
                return res.status(200).json({response: punitionSave});
            } catch (error) {
                res.json({response: 'Bad request'});
            }
        } else {
            return res.json({response: 'Bad params'});
        }
    },

    getAllPunition : async (req, res) => {
        try {
            var allPunition = await PunitionRepository.getAll();
            res.status(200).json({response: allPunition});
        } catch (error) {
            res.json({response: 'Bad request'});
        }
    }

}
