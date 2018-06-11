const mongoose = require('mongoose');

const CategorieSous_OffSchema = mongoose.Schema({
    nom_categorie: {
        type: String
    }
});

const PunitionSchema = mongoose.Schema({
    nature: {
        type: String
    },
    categorie_sous_officier: {
        type: CategorieSous_OffSchema
    },
    libelle_punition: {
        type: String
    }
});

module.exports = mongoose.model('Punition', PunitionSchema);