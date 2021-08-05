const router = require('express').Router();
// const { User, Blog, Comment } = require('../models')
const withAuth = require('../utils/auth');
const axios = require('axios');
const { convert } = require('html-to-text');

router.get('/', async (req, res) => {
  res.render('homeroute', {
    loggedIn: req.session.loggedIn
  })
  // res.send('hello')
})

// /search
router.get('/search/:name', async (req, res) => {
  console.log('------------hi from backend--------------')
  let query = req.params.name;
  // console.log('query', req.params.name)
  try {

    let api = `https://www.googleapis.com/books/v1/volumes?q=${query}`
    console.log('api------>', api)
    let bookData = await axios.get(api)
    // console.log('bookData-------', bookData)
    let items = bookData.data.items
    console.log('items--------', items)

    res.render('search', {items, loggedIn: req.session.loggedIn})
  }
  catch (err){
    res.status(500).json(err)
  }

})

// / search for one with isbn number
router.get('/searchone/:id', async (req, res) => {
  let id = req.params.id; // id example "ptiYBAAAQBAJ"
  // console.log('id---------------------', id)
  try {
    let api = `https://www.googleapis.com/books/v1/volumes/${id}`
    let response = await axios.get(api)
    console.log('single book data')
    let singleBookData = response.data;
    // id SOQGLxkrmiwC
    const html = singleBookData.volumeInfo.description
    const text = convert(html, {
      wordwrap: null
    });
    singleBookData.volumeInfo.description = text;

    res.render('book-detail', singleBookData)
  }
  catch (err){
    res.status(500).json(err)
  }
})


module.exports = router;