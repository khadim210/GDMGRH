const mongoose = require('mongoose');

const PunitionSchema = mongoose.Schema({
    nature: {
        type: String
    },
    suspensions: {
        officier: [
            {
                nom_categorie: String,
                libelle_punition: [
                    {
                        nom_punition: String
                    }
                ]
            }
        ]
    }
});

module.exports = mongoose.model('Punition', PunitionSchema);