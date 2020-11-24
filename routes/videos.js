const express = require('express');
const router = express.Router();
const Video = require('../models/Video');
const { loginCheck } = require('./middlewares');


function getId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return (match && match[2].length === 11)
    ? match[2]
    : null;
}; 
  
router.get('/auth/myvideos', loginCheck(), (req, res) => {
  res.render('auth/myvideos');
}); 



 router.get('/auth/form', loginCheck(), (req, res) => {
  res.render('auth/form');
}); 


router.post('/', (req, res, next) => {
  const { link } = req.body;
  Video.create({
    link,
    owner: req.user._id, 
    rating: 0 
  })
    .then(video => {
      res.redirect('/auth/myvideos') 
    })
    .catch(error => {
      next(error);
    })
});



router.get("/rating", (req, res, next) => {

   Video.findById(req.params.id)
   .then(video =>
    { //res.render("auth/videos", { video});
    req.params.rating = req.params.rating + 1;
  }) 
  .catch(err => {
    next(err);
})

}); 



router.get('/videos', (req, res) => {
 
  Video.find().then(videos => {
   console.log(videos); 
    let arrlinks = videos.map(video => {
     return video.link;
     } )
    const randomIndex = Math.floor(Math.random() * arrlinks.length);
    const embeddedVideo = getId(arrlinks[randomIndex]);
    res.render('videos', { videoList: videos, randomlink:  "//www.youtube.com/embed/" + embeddedVideo })
  }).catch(err => {
    console.log(err);
  })
});



/*
router.get('/videos/:id', (req, res) => {
  const videoId = req.params.id;
  // find the book with that id
  Video.findById(videoId)
    .then(video => {
      // render the view
      console.log(video);
      res.render('videoDetails', { videoDetails: video })
    })
    .catch(err => {
      console.log(err);
    })
})
*/ 


/*
// get videos? 
router.get('/:id', (req, res) => {
  // an admin can delete any room 
  // a user can only delete a room that they created  
  const query = { _id: req.params.id };
  // console.log('before if', query);
  if (req.user.role !== 'admin') {
    query.owner = req.user._id
  }
  // console.log('after if', query);
  Room.findOneAndDelete(query)
    .then(() => {
      res.redirect('/rooms')
    })
    .catch(err => {
      next(err);
    })
}) */ 

module.exports = router;