'use strict';

mongoose.Promise = require('bluebird');
import mongoose, {Schema} from 'mongoose';

const SubdivisionSchema = new Schema({
  nom: String,
  code: String,
  lieu: String,
  gps: String,
  contact: String,
  chef: {
    type: Schema.Types.ObjectId,
    ref: 'Agent'
  },
  categorie: String
});


export default mongoose.model('Subdivision', SubdivisionSchema);
