$(".login-btn").click(function(){
  document.location.replace('/api/login')
})

$( ".search-btn" ).click(function() {
  let input = $('.search-input').val()
  console.log('clicked')
  console.log('input----', input)

  document.location.replace(`/search/${input}`);

});

$('.book-photo').click(function() {
  var elementId = $(this).attr('id')
  console.log('element', elementId)
  document.location.replace(`/searchone/${elementId}`)
  // var api = `https://www.googleapis.com/books/v1/volumes/${elementId}`
})

//add to fav button
$('.add-fav-btn').click(function() {
  var bookEleId = $(this).siblings('a').attr('id')
  // console.log('bookELELELLELLE', bookEleId)
  fetch(`/fav-list/${bookEleId}`)
  .then(res => {
    if(res.ok) {
      console.log('resssss is good')
    }
  })
  .catch(err => {
    console.log('something wrong!!!!')
  })
})