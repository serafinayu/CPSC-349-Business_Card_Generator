document.addEventListener('DOMContentLoaded', function() {
    const loginButton = document.querySelector('.login-button');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');

    loginButton.addEventListener('click', function(event) {
        event.preventDefault();
        
        // Clear previous messages
        emailError.textContent = "";
        emailError.style.display = "none";

        // Email validation
        if (validateEmail(emailInput.value)) {
            storeEmail(emailInput.value);
            
        } else {
            emailError.textContent = "Please enter a valid email.";
            emailError.style.display = "block";
        }
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