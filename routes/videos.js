const express = require('express');
const router = express.Router();
const Video = require('../models/Video');
const { loginCheck } = require('./middlewares');


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
    /* .then(video => {
      res.redirect('/auth/videos') 
    })*/ 
    .catch(error => {
      next(error);
    })
});

/*

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