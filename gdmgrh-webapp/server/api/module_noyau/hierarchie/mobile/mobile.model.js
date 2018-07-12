'use strict';

mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';

const MobileSchema = new Schema({
  nom: String,
  code: String,
  lieu: String,
  gps: String,
  contact: String,
  chef: {
    type: Schema.Types.ObjectId,
    ref: 'Agent'
  },
  unite: [{
    type: Schema.Types.ObjectId,
    ref: 'Subdivision'
  }],
  legion: [{
    type: Schema.Types.ObjectId,
    ref: 'Entite'
  }]
});


export default mongoose.model('MobileCommandt', MobileSchema);
