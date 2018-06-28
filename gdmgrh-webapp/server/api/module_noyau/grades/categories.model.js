'use strict';

mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';

const CategorieSchema = mongoose.Schema({
    nomcategorie: {
        type: String
    },
});

module.exports = mongoose.model('Categorie', CategorieSchema);