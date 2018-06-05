const mongoose = require('mongoose');

const GradeSchema = mongoose.Schema({
    degree: {
        type: String
    }
});

module.exports = mongoose.model('Grade', GradeSchema);