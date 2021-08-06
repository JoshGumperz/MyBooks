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
                title: 'Success, you have logged in!',
                text: '🐈',
                showConfirmButton: false,
                timer: 1500
              })
            document.location.replace('/');
        } else {
            await Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Incorrect Username or Password 🤡',
                showConfirmButton: true,
              })
            // alert('Failed to log in.');
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
            await Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Account created! 💖',
                showConfirmButton: false,
                timer: 1500
              })
            document.location.replace('/');
        } else {
            await Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'User already exists 😅',
                showConfirmButton: false,
                timer: 1500
              })
            // alert('Failed to log in.!!!!');
        }
    }
};

$('.login-form').on('submit', loginFormHandler)
$('.signup-form').on('submit', signupFormHandler)





