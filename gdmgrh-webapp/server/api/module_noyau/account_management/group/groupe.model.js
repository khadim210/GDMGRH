'use strict';

mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';

const GroupeSchema = Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    users:[{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
    }],
    unite: {
        type: Schema.Types.ObjectId,
    },
    status: {
        type: String,
        default: 'actif',
        enum: ['actif', 'inactif']
    },
    created: {
        type: Date,
        select: false,
        default: Date.now()
    },
});

module.exports = mongoose.model('UserGroupe', GroupeSchema);
