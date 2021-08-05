const router = require('express').Router();
const { Book } = require('../../models');
const axios = require('axios');;
const withAuth = require('../../utils/auth');
const { convert } = require('html-to-text');


// //   /api/fav-list/SOQGLxkrmiwC
router.post('/:id', withAuth,  async (req, res) => { //withauth
  var id = req.params.id;
  // console.log('idddddd----------------', id)
  // console.log('plsssssssssss', req.session.loggedIn)
  // console.log('plsssssssssssfdsfdsafdsfadsf', req.session.user_id)
  try {
    let api = `https://www.googleapis.com/books/v1/volumes/${id}`
    let response = await axios.get(api)
    let singleBookData = response.data;
    // id -- SOQGLxkrmiwC
    // console.log('ressssdfdsfdsfdsfa---------', response.data)
    // console.log('singleBookData.volumeInfo.description-----htmlhtml----', singleBookData.volumeInfo.description)

    let noImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/330px-No-Image-Placeholder.svg.png"

    let descriptionText = convert(singleBookData.volumeInfo.description, {wordwrap: false})
    // console.log('descriptionText-------text version',  descriptionText)

    // console.log('array-------',singleBookData.volumeInfo.authors)
    // console.log('true - false', Array.isArray(singleBookData.volumeInfo.authors))
    if(Array.isArray(singleBookData.volumeInfo.authors)) {
      var  authorsInStr = singleBookData.volumeInfo.authors.join('')
      // console.log('after convertttttt insiide if if if-------', authorsInStr)
    }
    // console.log('after convertttttt-------', authorsInStr)
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
    console.log('obj-----------', obj)


    let dbRespond = await Book.create(obj)
    res.status(200).json(dbRespond);

  }
  catch (err) {
    console.log('something wrong!!!!!!!!!')
  }
})
// //   api/fav-list/
router.get('/', async (req, res) => {
  console.log("I am the favorite books get route")
  try {
    const bookData = await Book.findAll({
      where: {
        user_id: req.session.user_id
      },
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

router.get('/fav-detail/:id', async (req, res) => {
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
    res.render('fav-detail', {...singleBookData, loggedIn: req.session.loggedIn})
  }
  catch (err){
    res.status(500).json(err)
  }
})


// router.post('/:id', (req, res) => {
//   var id = req.params.id;

// })


module.exports = router;