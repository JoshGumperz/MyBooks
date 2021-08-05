$(".login-btn").click(function(){
  document.location.replace('/api/login')
})

$(".fav-btn").click(function(){
  document.location.replace('/api/fav-list')
})

$( ".search-btn" ).click(function() {
  let input = $('.search-input').val()
  console.log('clicked')
  console.log('input----', input)
  if(input) {
    document.location.replace(`/search/${input}`);
  }



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
  console.log('this is the id',bookEleId)
  // console.log('bookELELELLELLE', bookEleId)
  fetch(`/api/fav-list/${bookEleId}`, {
    method: 'POST'
  })
  .then(res => {
    // console.log('resssssss', res)
    if(res.redirected) {
      console.log('resssss is good')
      document.location.replace('/api/login')
    }
  })
  .catch(err => {
    console.log('something wrong!!!!')
  })
})