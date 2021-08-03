const router = require('express').Router();
// const { User, Blog, Comment } = require('../models')
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  res.render('homeroute')
  // res.send('hello')
})


module.exports = router;