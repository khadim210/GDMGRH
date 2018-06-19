const mongoose = require('mongoose');

const RecompenseSchema = mongoose.Schema({
    type_recompense: {
        type: String
    },
    intitules: [
        {
            nom_recompense: String
        }
    ]

});

module.exports = mongoose.model('Recompense', RecompenseSchema);