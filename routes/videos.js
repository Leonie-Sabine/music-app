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

router.get('/auth/myvideos', loginCheck(), (req, res) => {
  Video.find()
  .then(videos => {
    const ownedVideos = videos.filter(video => {
      return video.owner == req.session.passport.user
    })
    ownedVideos.forEach(item => {
      item.link = "//www.youtube.com/embed/" + getId(item.link)
    })
    res.render('auth/myvideos', {ownedVideos})
  }).catch(err => {
    console.log(err);
  })
}); 

router.post('/clicked', (req, res) => {
  const click = {clickTime: new Date()};
  console.log(click);

  Video.find().then(videos => {
   
    let arrlinks = videos.map(video => {
       video.rating = video.rating + 1; 
       console.log(video.rating); 

    })
  });

  /* Video.collection('clicks').save(click, (err, result) => {
    if (err) {
      return console.log(err);
    }
    console.log('click added to db');
    res.sendStatus(201);
  }); */ 
    
});


// router.get('/auth/myvideos', loginCheck(), (req, res) => {
  
//   Video.findOne({'owner': req.session.passport.user})
//   .then(ownedVideos => {
//     console.log(ownedVideos)
//     

//   }).catch(err => {
//     console.log(err);
//   })
// }); 


module.exports = router;