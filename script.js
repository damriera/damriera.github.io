const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const registerName = document.getElementById('registerName');
const registerEmail = document.getElementById('registerEmail');
const registerPassword = document.getElementById('registerPassword');
const login = document.getElementById('loginButton');
const register = document.getElementById('registerButton');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});



document.getElementById("loginButton").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent button default behavior

    // Get user input
    const loginEmail = document.getElementById("loginEmail").value;
    const loginPassword = document.getElementById("loginPassword").value;

    // Fetch user data from JSON file
    fetch("users.json")
        .then(response => response.json())
        .then(data => {
            const users = data.users;
            const user = users.find(u => u.email === loginEmail);

            if (!user) {
                showError("User not found.");
            } else if (user.password !== loginPassword) {
                showError("Incorrect password.");
            } else {
                showSuccess("Login successful!");
            }
        })
        .catch(error => console.error("Error:", error));
});


function showError(message) {
    alert("Error: " + message);
}

function showSuccess(message) {
    alert("Success: " + message);
}