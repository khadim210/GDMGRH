'use strict';

mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';

const GradeSchema = mongoose.Schema({
    categorie: {
        type: Schema.Types.ObjectId,
        ref: 'Categorie'
    },
    niveau: {
        type: Schema.Types.ObjectId,
        ref: 'Niveau'
    },
    nomgrade: {
        type: String
    },
    codegrade: {
        type: String
    }
});

module.exports = mongoose.model('Grade', GradeSchema);