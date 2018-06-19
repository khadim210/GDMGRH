const Recompense = require('./recompense.model');
var GenericRepository = require('../service/generic.repository');

const RecompenseRepository = new GenericRepository(Recompense);

module.exports = {

    addRecompense : async (req, res) => {
        var type_recompense = req.body.type_recompense;
        var intitules = req.body.intitules;

        if(type_recompense && intitules) {
            var recompenseParams = {
                type_recompense : type_recompense,
                intitules: intitules
            };
            var recompense = new Recompense(recompenseParams);
            try {
                var recompenseSave = await RecompenseRepository.save(recompense);
                return res.status(200).json({response: recompenseSave});
            } catch (error) {
                res.json({response: 'Bad request'});
            }
        } else {
            return res.json({response: 'Bad params'});
        }
    },

    getAllRecompense : async (req, res) => {
        try {
            var allRecompense = await RecompenseRepository.getAll();
            // res.status(200).json({response: allRecompense});
            res.status(200).send(allRecompense);
        } catch (error) {
            res.json({response: 'Bad request'});
        }
    }

}
