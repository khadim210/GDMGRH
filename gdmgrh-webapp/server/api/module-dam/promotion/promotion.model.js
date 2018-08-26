'use strict';

mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';

const PromotionSchema = new Schema({
  numero: String,
  libelle: String,
  niveau: String,
  effectifPrevu: String,
  attents: String,
  ordre: {
    type: Schema.Types.ObjectId,
    ref: 'Media'
  },
  candidats: [{
    type: Schema.Types.ObjectId,
    ref: 'Candidat'
  }],
  dateDebut: {
    type: Date,
    default: Date.now()
  },
  dateFin: Date,
  active: {
    type: Boolean,
    default: false
  },
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

export default mongoose.model('promotion', PromotionSchema);
