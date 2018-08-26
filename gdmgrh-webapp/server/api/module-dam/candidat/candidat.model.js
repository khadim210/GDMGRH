'use strict';

mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';

const CandidatSchema = new Schema({
  matricule: String,
  nom: String,
  prenom: String,
  cni: String,
  contact: String,
  email: String,
  genre: String,
  fichierJoint: [{
    type: Schema.Types.ObjectId,
    ref: 'Media'
  }],
  dateNaissance: Date,
  dernierDiplome: String,
  specialite: String,
  status: {
    type: String,
    default: 'attent'
  },
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

export default mongoose.model('Candidat', CandidatSchema);
