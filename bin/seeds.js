const mongoose = require('mongoose');
const Video = require('../models/Video');

mongoose.connect('mongodb://localhost/Videos', {  

  useNewUrlParser: true, 
  useUnifiedTopology: true
});

const videos = [
  {
      link: "http://"
      user: "xyz"
    
  },
  {
    link: "http://"
    user: "zyx"
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


