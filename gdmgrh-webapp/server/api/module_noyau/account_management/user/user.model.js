'use strict';

import crypto from 'crypto';
mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';

const UserSchema = new Schema({
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
        type: Schema.Types.ObjectId,
        ref: 'Agent'
    },
    role: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
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
    provider: {
      type: String,
      default: 'local',
      required: true
    },
});

UserSchema
    .virtual('password')
    .set(function(password) {
        this.salt = this.makeSalt();
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function() {
      return this._password;
    });

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

/**
 *  hooks methods
 */
UserSchema.pre('save', function(next) {
    this.updated = Date.now();
    next();
  });

export default mongoose.model('User', UserSchema);