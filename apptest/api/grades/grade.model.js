const mongoose = require('mongoose');

const GradeSchema = mongoose.Schema({
    nomgrade: {
        type: String ,require:true
    },
    codegrade: {
        type: String
    },
    categoriegrade: {
        
        categorie: { type: String},
        niveau: { type: String},

    }
});

module.exports = mongoose.model('Grade', GradeSchema);
