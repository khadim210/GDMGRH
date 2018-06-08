const mongoose = require('mongoose');

const DecorationSchema = mongoose.Schema({
    code: {
        type: String
    },
    libelle: {
        type: String
    }
});

module.exports = mongoose.model('Decoration', DecorationSchema);