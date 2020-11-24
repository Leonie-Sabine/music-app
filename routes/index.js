const express = require('express');
const router = express.Router();
const Video = require('../models/Video');

/* // GET home page 
router.get('/', (req, res, next) => {
  // passport syntax: req.user to get the logged in user
  console.log(req.user);
  res.render('index', { user: req.user });
}); */


function getId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return (match && match[2].length === 11)
    ? match[2]
    : null;
}; 




router.get('/', (req, res, next) => {

  Video.find().then(videos => {
   console.log(videos); 
    let arrlinks = videos.map(video => {
     return video.link;
     } )
    const randomIndex = Math.floor(Math.random() * arrlinks.length);
    const embeddedVideo = getId(arrlinks[randomIndex]);
    res.render('index', 
    { user: req.user, randomlink:  "//www.youtube.com/embed/" + embeddedVideo })
  }).catch(err => {
    console.log(err);
  })
}); 



module.exports = router;
