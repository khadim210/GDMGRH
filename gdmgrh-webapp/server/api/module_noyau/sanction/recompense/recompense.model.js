const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const RecompenseSchema = mongoose.Schema({
    type_recompense: {
        type: String,
        enum: ['Decoration', 'Autre decoration']
    },
    nom_recompense: String

});

module.exports = mongoose.model('Recompense', RecompenseSchema);