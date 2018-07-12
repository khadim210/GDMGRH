'use strict';

mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';

const SousCommandementSchema = new Schema({
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
  subdivision: [{
    nom: String,
    code: String,
    lieu: String,
    gps: String,
    contact: String,
    chef: {
      type: Schema.Types.ObjectId,
      ref: 'Agent'
    },
  }]
});


export default mongoose.model('SousCommandt', SousCommandementSchema);
