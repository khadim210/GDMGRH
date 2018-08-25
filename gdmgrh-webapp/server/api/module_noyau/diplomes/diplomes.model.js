'use strict';

import crypto from 'crypto';
mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';

const DiplomeSchema = mongoose.Schema({
    nom: {
        type: String
    },
    nomcourt: {
        type: String
    },
    niveauequivalent: {
        type: String
    },
    typediplome: {
      type: String
    }
});

module.exports = mongoose.model('Diplomes', DiplomeSchema);