'use strict';

mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';

const ArchiveDocumentSchema = new Schema({
  libelle: String,
  description: String,
  categorie: String,
  module: String,
  fichierJoint: {
    type: Schema.Types.ObjectId,
    ref: 'Media'
  },
  date: Date,
  updated: {
    type: Date,
    select: false
  },
  created: {
    type: Date,
    select: false,
    default: Date.now()
  },
});

export default mongoose.model('ArchiveDocument', ArchiveDocumentSchema);
