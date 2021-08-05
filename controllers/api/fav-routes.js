const router = require('express').Router();
const { Book } = require('../../models');
const axios = require('axios');;


//   /fav-list/book
router.post('/:id', async (req, res) => {
  var id = req.params.id;
  console.log('idddddd----------------', id)
  try {
    let api = `https://www.googleapis.com/books/v1/volumes/${id}`
    let response = await axios.get(api)
    let singleBookData = response.data;
    // id -- SOQGLxkrmiwC
    console.log('ssssss', singleBookData)


    let dbRespond = await Book.create({
      name: singleBookData.volumeInfo.title,
      author: singleBookData.volumeInfo.authors,
      description: singleBookData.volumeInfo.description,
      release_date: singleBookData.volumeInfo.publishedDate,
      image_link: singleBookData.volumeInfo.imageLinks.thumbnail,
      user_id: req.session.user_id
    })

  }
  catch (err) {
    console.log('something wrong')
  }

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