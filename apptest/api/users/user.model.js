const mongoose = require('mongoose');
const crypto = require('crypto');
mongoose.Promise = require('bluebird');

const UserSchema = mongoose.Schema({
    username: {
        type: String 
    },
    hashedPassword: {
      type: String,
      required: false,
      select: false
    },
    salt: {
      type: String,
      select: false
    },
    agent: {
        type: mongoose.Schema.Types.ObjectId
    },
    rule: [{
        type: String
    }],
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
    updated: {
        type: Date,
        select: false
    },
});

UserSchema
    .virtual('password')
    .set(function(password) {
        this.salt = this.makeSalt();
        this.hashedPassword = this.encryptPassword(password);
    })

/**
 * Méthod
 */

UserSchema.methods = {
    verifyPassword(plainText) {
      return this.encryptPassword(plainText) === this.hashedPassword;
    },
  
    makeSalt() {
      return crypto.randomBytes(16).toString('base64');
    },
  
    encryptPassword(password) {
      if(!password || !this.salt) {
        return '';
      }
      var salt = new Buffer(this.salt, 'base64');
      return crypto.pbkdf2Sync(password, salt, 10, 64, 'sha1')
        .toString('base64');
    },
}

module.exports = mongoose.model('User', UserSchema);