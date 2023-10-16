document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.querySelector('.login-button');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    loginButton.addEventListener('click', function(event) {
        event.preventDefault();
        
        // Clear previous messages
        emailError.textContent = "";
        emailError.style.display = "none";
        passwordError.textContent = "";
        passwordError.style.display = "none";

        // Email validation
        if (!validateEmail(emailInput.value)) {
            emailError.textContent = "Please enter a valid email!";
            emailError.style.display = "block";
            return;
        }

        // Password check
        if (passwordInput.value.trim() === "") {
            passwordError.textContent = "Please enter a password!";
            passwordError.style.display = "block";
            return;
        }

        storeEmail(emailInput.value);
        //code to navigate to another page when successful login
    });
});

function validateEmail(email) {
    // Email validation regex
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

function storeEmail(email) {
    // Store email in browser's local storage
    localStorage.setItem('userEmail', email);
}
