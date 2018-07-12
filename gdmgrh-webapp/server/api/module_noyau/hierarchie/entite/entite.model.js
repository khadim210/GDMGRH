'use strict';

mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';

const EntiteSchema = new Schema({
  nom: String,
  code: String,
  lieu: String,
  gps: String,
  contact: String,
  chef: {
    type: Schema.Types.ObjectId,
    ref: 'Agent'
  },
  categorie: String,
  sousentite: [{
    type: Schema.Types.ObjectId,
    ref: 'Subdivision'
  }]
});


export default mongoose.model('Entite', EntiteSchema);
