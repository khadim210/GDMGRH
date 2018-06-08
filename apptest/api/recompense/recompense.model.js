const mongoose = require('mongoose');

const RecompenseSchema = mongoose.Schema({
    libelle: {
        type: String
    }
});

module.exports = mongoose.model('Recompense', RecompenseSchema);