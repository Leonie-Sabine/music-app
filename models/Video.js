const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  link: String, 
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }, 
  rating: Number
});

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;