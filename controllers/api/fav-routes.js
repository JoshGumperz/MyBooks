const router = require('express').Router();
const { Book } = require('../../models')

//   /fav-list/
router.get('/', async (req, res) => {
  console.log("I am the favorite books get route")
  try {
    const bookData = await Book.findAll({
      order: [
        ['createdAt', 'DESC']
      ]
    });
    console.log("book data:------------", bookData)
    // let bookData = await axios.get(api)
    // // console.log('bookData-------', bookData)
    // let books = bookData.data.items

    const books = bookData.map((favbook) => favbook.get({ plain: true }));
    console.log("books:--------", books)

    res.render('fav-books', {
      books,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

// router.post('/:id', (req, res) => {
//   var id = req.params.id;

// })




module.exports = router;