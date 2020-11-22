const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videochema = new Schema({
  link: String, 
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const User = mongoose.model('Video', videoSchema);
module.exports = Video;