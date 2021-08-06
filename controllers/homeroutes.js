const router = require('express').Router();
const withAuth = require('../utils/auth');
const axios = require('axios');
const { convert } = require('html-to-text');

//GET - /
router.get('/', async (req, res) => {
  res.render('homeroute', {
    loggedIn: req.session.loggedIn
  })
})

//GET  /search
router.get('/search/:name', async (req, res) => {
  let query = req.params.name;
  try {
    let api = `https://www.googleapis.com/books/v1/volumes?q=${query}`
    let bookData = await axios.get(api)
    let items = bookData.data.items

    res.render('search', {items, loggedIn: req.session.loggedIn})
  }
  catch (err){
    res.status(500).json(err)
  }

})

// GET - /searchone/:id   // id example "ptiYBAAAQBAJ"
router.get('/searchone/:id', async (req, res) => {
  let id = req.params.id;
  try {
    let api = `https://www.googleapis.com/books/v1/volumes/${id}`
    let response = await axios.get(api)
    let singleBookData = response.data;
    const html = singleBookData.volumeInfo.description
    const text = convert(html, {
      wordwrap: null
    });
    singleBookData.volumeInfo.description = text;

    res.render('book-detail', {...singleBookData, loggedIn: req.session.loggedIn})
  }
  catch (err){
    res.status(500).json(err)
  }
})


module.exports = router;