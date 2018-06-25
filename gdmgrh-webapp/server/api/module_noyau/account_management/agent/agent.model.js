'use strict';

mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';

const AgentSchema = Schema({
    name: String,
    access: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Agent', AgentSchema);