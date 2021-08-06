const logout = async () => {
    const response = await fetch('/api/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      await Swal.fire({
        icon: 'success',
        title: 'Bye!!',
        text: 'Cya!!!!!',
        showConfirmButton: false,
        timer:1500
      })
      document.location.replace('/');
    } else {
      alert('Failed to log out.');
    }
};

$('.logout-btn').on('click', logout);



