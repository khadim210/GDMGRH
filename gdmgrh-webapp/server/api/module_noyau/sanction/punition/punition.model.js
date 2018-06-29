const mongoose = require('mongoose');

const PunitionSchema = mongoose.Schema({
    type_punition: {
        type: String,
        enum: ['Punition statuaire', 'Punition normale']
    },
    type_officier: {
        type: String,
        enum: ['Sous officiers de carrière - commisionnées', 'Autres sous officiers', 'Tous les sous officiers']
    },
    nom_punition: {
        type: String
    }
});
module.exports = mongoose.model('Punition', PunitionSchema);