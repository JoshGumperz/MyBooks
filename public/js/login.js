const loginFormHandler = async (event) => {
    event.preventDefault();

    const username = $('#username-login').val().trim();
    const password = $('#password-login').val().trim();

    if (username && password) {
        const response = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });



        if (response.ok) {
            await Swal.fire({
                icon: 'success',
                title: 'you are log in',
                text: 'Log in lalalal',
              })
            setTimeout(() => {
                document.location.replace('/');
            }, 500)
        } else {
            // await Swal.fire({
            //     position: 'center',
            //     icon: 'error',
            //     title: 'Failed to log in 😅',
            //     showConfirmButton: false,
            //     timer: 1500
            //   })
            alert('Failed to log in.');
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = $('#username-signup').val().trim();
    const password = $('#password-signup').val().trim();

    if (username && password) {
        const response = await fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        // Swal.fire('Thanks for create a new Account!')
        if (response.ok) {
            console.log(' thanks for log back in')
            await Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'HAHAH I made it work ! 😀',
                showConfirmButton: false,
                timer: 1500
              })

            setTimeout(() => {
                document.location.replace('/');
            }, 1500)
        } else {
            await Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'No No 😅',
                showConfirmButton: false,
                timer: 1500
              })
            // alert('Failed to log in.!!!!');
        }
    }
};

$('.login-form').on('submit', loginFormHandler)
$('.signup-form').on('submit', signupFormHandler)





