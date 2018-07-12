'use strict';

mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';

const EtatMajorSchema = new Schema({
  nom: String,
  code: String,
  lieu: String,
  gps: String,
  contact: String,
  chef: {
    type: Schema.Types.ObjectId,
    ref: 'Agent'
  },
  division: [{
    chefadjoint: {
      agent: {
        type: Schema.Types.ObjectId,
        ref: 'Agent'
      },
      attribution: String,
    },
    iddivision: [{
      type: Schema.Types.ObjectId,
      ref: 'Subdivision'
    }]
  }]
});


export default mongoose.model('EtatMajorCommandt', EtatMajorSchema);
