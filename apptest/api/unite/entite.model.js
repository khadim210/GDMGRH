var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const EntiteSchema = mongoose.Schema({
    nome: String,
    lieu: String,
    chef: String,
    code: String,
    gps: String,
    contact: String,
    types: {
        type: String,
        emu: ['haut_commandement', 'sous_commandement', 'legion', 'compagnie']
    },
    sous_entite: {
        types: {
            type: String,
            enum: ['sous_commandement', 'escadron', 'brigade']
        },
        id_sous_entite: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SousEntite',
        }]
    }
});

module.exports = mongoose.model('entite', EntiteSchema);