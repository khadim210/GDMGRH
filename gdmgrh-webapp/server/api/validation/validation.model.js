'use strict';
mongoose.Promise = require('bluebird');
import mongoose, {
  Schema
} from 'mongoose';

const ValidedSchema = new Schema({
  libelle: {
    type: String,
    required: true
  },
  validIdInsert: {
    type: Schema.Types.ObjectId,
  },
  categorie: String,
  type: String,
  division: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'attent'
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  created: {
    type: Date,
    select: false,
    default: Date.now()
  },
  updated: {
    type: Date,
    select: false
  }
});

export default mongoose.model('Valided', ValidedSchema);
