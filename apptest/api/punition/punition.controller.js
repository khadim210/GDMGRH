const Punition = require('./punition.model');
var GenericRepository = require('../service/generic.repository');

const PunitionRepository = new GenericRepository(Punition);

module.exports = {

    addPunition : async (req, res) => {
        var type_punition = req.body.type_punition;
        var intitules = req.body.intitules;

        if(type_punition && intitules ) {
            var punitionParams = {
                type_punition : type_punition,
                intitules: intitules
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
            // res.status(200).json({response: allPunition});
            res.status(200).send(allPunition);
        } catch (error) {
            res.json({response: 'Bad request'});
        }
    }

}
