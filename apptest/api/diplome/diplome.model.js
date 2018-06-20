const mongoose = require('mongoose');

const DiplomeSchema = mongoose.Schema({
    nom: {
        type: String
    },
    nomcourt: {
        type: String
    },
    niveauequivalent: {
        type: String
    }
});

module.exports = mongoose.model('Diplome', DiplomeSchema);