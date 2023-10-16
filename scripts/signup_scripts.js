document.addEventListener('DOMContentLoaded', function () {
    const joinButton = document.querySelector('.join-button');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    joinButton.addEventListener('click', function (event) {
        event.preventDefault();

        // Clear previous messages
        nameError.textContent = "";
        nameError.style.display = "none";
        emailError.textContent = "";
        emailError.style.display = "none";
        passwordError.textContent = "";
        passwordError.style.display = "none";

        // Name validation
        if (!nameInput.value.trim()) {
            nameError.textContent = "Name is required!";
            nameError.style.display = "block";
            return;
        }

        // Email validation
        if (!validateEmail(emailInput.value)) {
            emailError.textContent = "Invalid email address.";
            emailError.style.display = "block";
            return;
        }

        // Password validation
        if (passwordInput.value.trim().length < 6) {
            passwordError.textContent = "Password must be at least 6 characters.";
            passwordError.style.display = "block";
            return;
        }

        storeDetails(nameInput.value, emailInput.value, passwordInput.value);
        // Code to navigate to another page when successful sign up or clear input values        
    });
});

function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

function storeDetails(name, email, password) {
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
}

function createErrorMessage(id, inputElement) {
    const errorMessage = document.createElement('span');
    errorMessage.id = id;
    errorMessage.style.color = "red";
    errorMessage.style.display = "none";
    inputElement.parentElement.appendChild(errorMessage);
    return errorMessage;
}
