


$( ".search-btn" ).click(function() {
  let input = $('.search-input').val()
  console.log('clicked')
  console.log('input----', input)

  fetch(`/${input}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(res => {
    if(res.ok) {
      document.location.replace('/search');
    }
  })



});