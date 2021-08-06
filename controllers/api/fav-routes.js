const router = require('express').Router();
const { Book } = require('../../models');
const axios = require('axios');;
const withAuth = require('../../utils/auth');
const { convert } = require('html-to-text');


// -  POST /api/fav-list/
router.post('/:id', withAuth,  async (req, res) => {
  var id = req.params.id;

  try {
    let api = `https://www.googleapis.com/books/v1/volumes/${id}`
    let response = await axios.get(api)
    let singleBookData = response.data;

    //If data doesn't have any image.
    let noImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png"

    // If description come in as HTML convert it to TEXT
    let descriptionText = convert(singleBookData.volumeInfo.description, {wordwrap: false})

    // If authors is a array.
    if(Array.isArray(singleBookData.volumeInfo.authors)) {
      var  authorsInStr = singleBookData.volumeInfo.authors.join('')
    }

    let title = singleBookData.volumeInfo.title || 'No Title information';
    let book_id = singleBookData.id
    let authors = authorsInStr || ' No Author Data';
    let description = descriptionText || 'No Description data';
    let release_date = singleBookData.volumeInfo.publishedDate || 'No Release_date info'
    let image_link = singleBookData.volumeInfo.imageLinks.thumbnail || noImage;

    let obj = {
      name: title,
      book_id: book_id,
      author: authors,
      description: description,
      release_date: release_date,
      image_link: image_link,
      user_id: req.session.user_id
    }

    let dbRespond = await Book.create(obj)
    res.status(200).json(dbRespond);
  }
  catch (err) {
    console.log(err)
  }
})

// - GET api/fav-list/
router.get('/', async (req, res) => {
  try {
    const bookData = await Book.findAll({
      where: {
        user_id: req.session.user_id
      },
      order: [
        ['createdAt', 'DESC']
      ]
    });

    const books = bookData.map((favbook) => favbook.get({ plain: true }));

    res.render('fav-books', {
      books,
      loggedIn: req.session.loggedIn,
    });
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

// - GET api/fav-list/fav-detail/:id  --  id example to test "ptiYBAAAQBAJ"
router.get('/fav-detail/:id', async (req, res) => {
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

    res.render('fav-detail', {...singleBookData, loggedIn: req.session.loggedIn})
  }
  catch (err){
    res.status(500).json(err)
  }
})

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const bookData = await Book.destroy({
      where: {
        book_id: req.params.id,
      },
    });

    if (!bookData) {
      res.status(404).json({ message: 'No book found with that id!' });
      return;
    }

    res.status(200).json(bookData);
  } catch (err) {
    res.status(500).json(err);
  }
})


module.exports = router;