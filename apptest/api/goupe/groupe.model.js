const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const GroupeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    users:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
    }],
    unite: {
        type: mongoose.Schema.Types.ObjectId,
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