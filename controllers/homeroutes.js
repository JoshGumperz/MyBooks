const router = require('express').Router();
// const { User, Blog, Comment } = require('../models')
const withAuth = require('../utils/auth');
const axios = require('axios');

router.get('/', async (req, res) => {
  res.render('homeroute')
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
    // console.log('items--------', items)
    res.render('search', {items})
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
    let singleBookData = await axios.get(api)
    console.log('single book data',singleBookData.data)
    res.json(singleBookData.data)
  }
  catch (err){
    res.status(500).json(err)
  }
})


module.exports = router;