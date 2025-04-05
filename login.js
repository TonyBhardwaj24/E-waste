document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.querySelector('#login-form');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const userData = {
            email: email.value,
            password: password.value
        };

        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert('Login successful!');
                window.location.href = './index.html'; // Redirect to a dashboard or home page
            } else {
                alert(data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
    });
});
