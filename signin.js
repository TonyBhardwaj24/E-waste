const signupForm = document.querySelector("form");
signupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  if (password !== confirmPassword) {
    alert("Passwords don't match");
    return;
  }

  // Send the data to the backend
  fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      if (data.message === "User created successfully!") {
        window.location.href = "login.html"; // Redirect to login page
      }
    })
    .catch((error) => {
      alert("Error: " + error);
    });
});
