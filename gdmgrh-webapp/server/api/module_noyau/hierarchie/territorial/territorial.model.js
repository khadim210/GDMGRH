'use strict';

mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';

const TerritorialSchema = new Schema({
  nom: String,
  code: String,
  lieu: String,
  gps: String,
  contact: String,
  chef: {
    type: Schema.Types.ObjectId,
    ref: 'Agent'
  },
  section: [{
    type: Schema.Types.ObjectId,
    ref: 'Subdivision'
  }],
  legion: [{
    nom: String,
    code: String,
    lieu: String,
    gps: String,
    contact: String,
    chef: {
      type: Schema.Types.ObjectId,
      ref: 'Agent'
    },
    brigade: [{
      nom: String,
      code: String,
      lieu: String,
      gps: String,
      contact: String,
      chef: {
        type: Schema.Types.ObjectId,
        ref: 'Agent'
      }
    }],
    etatmajor: {
      nom: String,
      code: String,
      lieu: String,
      gps: String,
      contact: String,
      chef: {
        type: Schema.Types.ObjectId,
        ref: 'Agent'
      }
    },
    compagnie: [{
      type: Schema.Types.ObjectId,
      ref: 'Entite'
    }]
  }]
});


export default mongoose.model('TerritorialCommandt', TerritorialSchema);
