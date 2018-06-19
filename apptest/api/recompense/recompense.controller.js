const Recompense = require('./recompense.model');
var GenericRepository = require('../service/generic.repository');

const RecompenseRepository = new GenericRepository(Recompense);

module.exports = {

    addRecompense : async (req, res) => {
        var nature_recompense = req.body.nature_recompense;
        var libelle = req.body.libelle;

        if(libelle && nature_recompense) {
            var recompenseParams = {
                libelle : libelle,
                nature_recompense: nature_recompense
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
