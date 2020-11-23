const mongoose = require('mongoose');
const Video = require('../models/Video');

mongoose.connect('mongodb://localhost/Videos', {  

  useNewUrlParser: true, 
  useUnifiedTopology: true
});

const videos = [
  {
      link: "https://youtu.be/CDK1r39lPWA", 
      user: "Supererbin",
      rating: 0 
    
  },
  {
    link: "https://youtu.be/yQ3BfMUnCOk", 
    user: "5fbbc0a21a72401cc7280485", 
    rating: 0 
  },
  
{ link: "https://youtu.be/HH5WtUPrgPc", 
user: "Psymon Spine", 
rating: 0}
];


Video.insertMany(videos)
  .then(data => {
    console.log(`Success! ${data.length} videos added to the collection`);
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
  });


