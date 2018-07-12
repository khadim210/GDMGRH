'use strict';
mongoose.Promise = require('bluebird');
import mongoose, {
  Schema
} from 'mongoose';

const MediaSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  type: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true
  },
  urlResized: String,
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'Agent'
  },
  created: {
    type: Date,
    select: false,
    default: Date.now()
  },
  updated: {
    type: Date,
    select: false
  }
});

export default mongoose.model('Media', MediaSchema);
