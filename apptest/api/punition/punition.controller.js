const Punition = require('./punition.model');
var GenericRepository = require('../service/generic.repository');

const PunitionRepository = new GenericRepository(Punition);

module.exports = {

    addPunition : async (req, res) => {
        var nature = req.body.nature;
        var sous_officier = req.body.sous_officier;

        if(nature && sous_officier) {
            var punitionParams = {
                nature : nature,
                sous_officier: sous_officier
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
