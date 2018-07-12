'use strict';

mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';

const CommandtSchema = new Schema({
  nom: {
    type: String,
    default: 'Haut Commandement'
  },
  code: String,
  lieu: String,
  gps: String,
  contact: String,
  chef: {
    type: Schema.Types.ObjectId,
    ref: 'Agent'
  },
  generalsouscommandt: [{
    type: Schema.Types.ObjectId,
    ref: 'SousCommandt'
  }],
  etatmajorsouscommandt: {
    type: Schema.Types.ObjectId,
    ref: 'EtatMajorCommandt'
  },
  mobilesouscommandt: {
    type: Schema.Types.ObjectId,
    ref: 'MobileCommandt'
  },
  territorialsouscommandt: {
    type: Schema.Types.ObjectId,
    ref: 'TerritorialCommandt'
  }
});


export default mongoose.model('Commandt', CommandtSchema);
