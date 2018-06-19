const mongoose = require('mongoose');

const PunitionSchema = mongoose.Schema({
    type_punition: {
        type: String
    },
    intitules: {
        suspension: [
            {
                type_officier: String,
                libelle: [
                    {
                        nom_punition: String
                    }
                ]
            }
        ]
    }
});
module.exports = mongoose.model('Punition', PunitionSchema);