var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const AgentSchema = mongoose.Schema({
    name: String,
    access: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Agent', AgentSchema);