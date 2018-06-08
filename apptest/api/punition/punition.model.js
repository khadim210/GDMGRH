const mongoose = require('mongoose');

const PunitionSchema = mongoose.Schema({
    nature: {
        type: String
    },
    sous_officier: {
        type: String
    }
});

module.exports = mongoose.model('Punition', PunitionSchema);