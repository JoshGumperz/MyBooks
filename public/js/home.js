$(".login-btn").click(function(){
  document.location.replace('/api/login')
})

$( ".search-btn" ).click(function() {
  let input = $('.search-input').val()
  console.log('clicked')
  console.log('input----', input)

  document.location.replace(`/search/${input}`);
  // fetch(`/search/${input}`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // })

  // .then(res => {
  //   console.log('res----', res)
  //   if(res.ok) {
  //     document.location.replace(`/search/${input}`);
  //   }
  // })

  // document.location.replace('/testing');
});

$('.book-photo').click(function() {
  var element = $(this).attr('id')
  console.log('element', element)
  var api = `https://www.googleapis.com/books/v1/volumes/${xxx}`

  fetch()
})