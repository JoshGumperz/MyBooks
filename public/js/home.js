//When login button click
$(".login-btn").click(function () {

  document.location.replace('/api/login')

})

//When fav button click
$(".fav-btn").click(function () {
  document.location.replace('/api/fav-list')
})

// WHen search button click
$(".search-btn").click(async function () {
  let input = $('.search-input').val()
  if (!input) {
    Swal.fire({
      title: 'Type something!!',
      text: 'hello',
      icon: 'warning',
      width: 500,
      padding: '2em',
      confirmButtonColor: 'cadetblue',
      backdrop: `
    lightblue
      url("../images/cat1.gif")
      bottom
      no-repeat
    `
    })
  }
  if (input) {
    await Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Lets take a look 🔍',
      showConfirmButton: false,
      timer: 800
    })
    // setTimeout(() => {
    //   document.location.replace(`/search/${input}`);
    // })
    document.location.replace(`/search/${input}`);
  }
});

//NOT LOGIN - When click on one of the search return item
$('.book-photo').click(function () {
  var elementId = $(this).attr('id')
  document.location.replace(`/searchone/${elementId}`)
})

//LOGIN in.
$('.fav-book-photo').click(function () {
  var elementId = $(this).attr('id')

  document.location.replace(`fav-list/fav-detail/${elementId}`)
})

//add to fav button
$('.add-fav-btn').click(async function () {
  console.log('add-')
  try {
    var bookEleId = $(this).siblings('a').attr('id')
    // bookEleId = "bookId"
    var res = await fetch(`/api/fav-list/${bookEleId}`, {
      method: 'POST'
    })
    console.log(res)
    if (res.redirected) {
      console.log("You are not logged in!")
    } 
    else if (res.ok) {
      await Swal.fire({
        title: 'added!',
        text: 'ADD',
        icon: 'success',
        confirmButton: true
      })
    }
  } catch(err) {
    console.log(err)
  }
})

$('.remove-fav-btn').click(async function () {
  var bookEleId = $(this).siblings('a').attr('id')
  fetch(`/api/fav-list/${bookEleId}`, {
    method: 'DELETE'
  })
    .then(res => {
      if (res.redirected) {
        document.location.replace('/api/login')
      }
      if (res.ok) {
        console.log("res is good")

        document.location.replace('/api/fav-list')
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
