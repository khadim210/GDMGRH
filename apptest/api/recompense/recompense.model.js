const mongoose = require('mongoose');

const RecompenseSchema = mongoose.Schema({
    nature_recompense: {
        type: String
    },
    libelle: [
        {
            nom_recompense: String
        }
    ]

});

module.exports = mongoose.model('Recompense', RecompenseSchema);