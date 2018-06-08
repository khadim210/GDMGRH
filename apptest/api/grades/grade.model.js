const mongoose = require('mongoose');

const GradeSchema = mongoose.Schema({
    nomgrade: {
        type: String
    },
    categoriegrade: {
        type: String
    }
});

module.exports = mongoose.model('Grade', GradeSchema);
