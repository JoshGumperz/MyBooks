//When login button click
$(".login-btn").click(function(){
  document.location.replace('/api/login')
})

//When fav button click
$(".fav-btn").click(function(){
  document.location.replace('/api/fav-list')
})

// WHen search button click
$( ".search-btn" ).click(function() {
  let input = $('.search-input').val()
  if(input) {
    document.location.replace(`/search/${input}`);
  }
});

//NOT LOGIN - When click on one of the search return item
$('.book-photo').click(function() {
  var elementId = $(this).attr('id')
  document.location.replace(`/searchone/${elementId}`)
})

//LOGIN in.
$('.fav-book-photo').click(function() {
  var elementId = $(this).attr('id')
  document.location.replace(`fav-list/fav-detail/${elementId}`)
})

//add to fav button
$('.add-fav-btn').click(function() {
  var bookEleId = $(this).siblings('a').attr('id')
  fetch(`/api/fav-list/${bookEleId}`, {
    method: 'POST'
  })
  .then(res => {
    if(res.redirected) {
      console.log('resssss is good')
      document.location.replace('/api/login')
    }
  })
  .catch(err => {
    console.log('something wrong!!!!')
  })
})
// import Swal from 'sweetalert2'

// Swal.fire({
//   title: 'Error!',
//   text: 'Do you want to continue',
//   icon: 'error',
//   confirmButtonText: 'Cool'
// })

// console.log('swal', Swal);