const Recompense = require('./recompense.model');
var GenericRepository = require('../service/generic.repository');

const RecompenseRepository = new GenericRepository(Recompense);

module.exports = {

    addRecompense : async (req, res) => {
        var libelle = req.body.libelle;

        if(libelle) {
            var recompenseParams = {
                libelle : libelle
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
            res.status(200).json({response: allRecompense});
        } catch (error) {
            res.json({response: 'Bad request'});
        }
    }

}
