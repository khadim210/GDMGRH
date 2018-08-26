'use strict';

mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';

const AuxiliaireSchema = new Schema({
  matricule: String,
  nom: String,
  prenom: String,
  cni: String,
  contact: Number,
  email: Number,
  genre: String,
  fichierJoint: [{
    type: Schema.Types.ObjectId,
    ref: 'Media'
  }],
  dateNaissance: Date,
  dernierDiplome: String,
  specialite: String,
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

export default mongoose.model('Auxiliaire', AuxiliaireSchema);
