var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const SubdivisionSchema = mongoose.Schema({
    nome: String,
    lieu: String,
    chef: String,
    code: String,
    gps: String,
    contact: String,
    types: {
        type: String,
        enum: ['escadron', 'section', 'brigade']
    }
});

module.exports = mongoose.model('entite', SubdivisionSchema);