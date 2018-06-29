'use strict';

mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';

const NiveauSchema = mongoose.Schema({
    nomniveau: {
        type: String
    },
    categorie: {
    	type: Schema.Types.ObjectId,
        ref: 'Categorie'
    }
});

module.exports = mongoose.model('Niveau', NiveauSchema);