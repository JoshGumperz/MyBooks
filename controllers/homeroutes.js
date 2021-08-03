const router = require('express').Router();
// const { User, Blog, Comment } = require('../models')
const withAuth = require('../utils/auth');
const axios = require('axios');

router.get('/', async (req, res) => {
  res.render('homeroute')
  // res.send('hello')
})

// /search
router.get('/:name', async (req, res) => {
  try {
    let query = req.params.name;
    let api = `https://www.googleapis.com/books/v1/volumes?q=${query}`
    let bookData = await axios.get(api)
    console.log('bookData-----', bookData.data)
    res.json(bookData.data)
  }
  catch (err){
    res.status(500).json(err)
  }

})


module.exports = router;