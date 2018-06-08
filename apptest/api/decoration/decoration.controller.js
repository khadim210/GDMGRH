const Decoration = require('./decoration.model');
var GenericRepository = require('../service/generic.repository');

const DecorationRepository = new GenericRepository(Decoration);

module.exports = {

    addDecoration : async (req, res) => {
        var code = req.body.code;
        var libelle = req.body.libelle;

        if(code && libelle) {
            var decorationParams = {
                code : code,
                libelle: libelle
            };
            var decoration = new Decoration(decorationParams);
            try {
                var decorationSave = await DecorationRepository.save(decoration);
                return res.status(200).json({response: decorationSave});
            } catch (error) {
                res.json({response: 'Bad request'});
            }
        } else {
            return res.json({response: 'Bad params'});
        }
    },

    getAllDecoration : async (req, res) => {
        try {
            var allDecoration = await DecorationRepository.getAll();
            res.status(200).json({response: allDecoration});
        } catch (error) {
            res.json({response: 'Bad request'});
        }
    }

}
