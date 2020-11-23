const mongoose = require('mongoose');
const Video = require('../models/Video');

mongoose.connect('mongodb://localhost/Videos', {  

  useNewUrlParser: true, 
  useUnifiedTopology: true
});

const videos = [
  {
      link: "http://",
      user: "xyz",
      rating: 0 
    
  },
  {
    link: "http://",
    user: "zyx", 
    rating: 0 
  },
  
];


Video.insertMany(videos)
  .then(data => {
    console.log(`Success! ${data.length} videos added to the collection`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
  });


