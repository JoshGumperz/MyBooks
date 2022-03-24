// toggle sidebar on and off
const sidebar = $("#sidebar")
const toggleSidebarOff = () => {
  sidebar.removeClass("sidebar-visible").addClass("sidebar-hidden").css("transition", "0.3s ease-in-out")
}
const toggleSidebarOn = () => {
  sidebar.removeClass("sidebar-hidden").addClass("sidebar-visible").css("transition", "0.3s ease-in-out")
}
$(".mobile-icon").click(toggleSidebarOn)
sidebar.click(toggleSidebarOff)

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
      title: 'Please Enter A Book Title Before Searching',
      icon: 'warning',
      width: 500,
      padding: '2em',
      confirmButtonColor: 'cadetblue'
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
$('.book-box-content').click(function () {
  var elementId = $(this).attr('id')
  document.location.replace(`/searchone/${elementId}`)
})

//LOGIN in.
$('.fav-box-content').click(function () {
  var elementId = $(this).attr('id')

  document.location.replace(`fav-list/fav-detail/${elementId}`)
})

//add to fav button
$('.add-fav-btn').click(async function () {
  console.log('add-')
  try {
    var bookEleId = $(this).parent().siblings('section').attr('id')
    // bookEleId = "bookId"
    var res = await fetch(`/api/fav-list/${bookEleId}`, {
      method: 'POST'
    })
    console.log(res)
    if (res.redirected) {
      console.log("You are not logged in!")
      await Swal.fire({
        title: 'Please log in first!',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      })
      document.location.replace('/api/login')
    }
    else if (res.ok) {
      await Swal.fire({
        title: 'Added!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      })
    }
  } catch(err) {
    console.log(err)
  }
})

$('.remove-fav-btn').click(async function () {
  try {
    var bookEleId = $(this).parent().siblings('section').attr('id')
    var res = await fetch(`/api/fav-list/${bookEleId}`, {
      method: 'DELETE'
    })
    if(res.redirected) {
      console.log("You are not logged in!")
      document.location.replace('/api/login')
    } else if (res.ok) {
      await Swal.fire({
        title: 'Removed!',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      })
      document.location.replace('/api/fav-list')
    }
  } catch(err) {
    console.log(err)
  }
})
