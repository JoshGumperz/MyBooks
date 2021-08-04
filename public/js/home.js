
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