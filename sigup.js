document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.querySelector('#signup-form');
    const username = document.querySelector('#username');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const confirmPassword = document.querySelector('#confirm-password');

    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const userData = {
            username: username.value,
            email: email.value,
            password: password.value,
            confirmPassword: confirmPassword.value
        };

        if (!userData.username || !userData.email || !userData.password || !userData.confirmPassword) {
            alert("All fields are required!");
            return;
        }

        if (userData.password !== userData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        fetch('http://localhost:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert('Signup successful!');
                window.location.href = 'login.html';
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
