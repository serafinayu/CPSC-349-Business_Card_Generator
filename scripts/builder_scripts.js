function saveImageToSessionStorage(inputElementId, storageKey) {
    const inputElement = document.getElementById(inputElementId);
    if (inputElement.files && inputElement.files[0]) {
        const reader = new FileReader();

        reader.onload = function(event) {
            // Save the Base64 string to sessionStorage
            sessionStorage.setItem(storageKey, event.target.result);
        };

        reader.readAsDataURL(inputElement.files[0]);
    }
}

document.getElementById("submit").addEventListener("click", function() {
    function collectFormData() {
        // Collecting form data
        let cardData = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            github: document.getElementById("github").value,
            linkedin: document.getElementById("linkedin").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            title: document.getElementById("title").value,
            skills: document.getElementById("skills").value,
            company: document.getElementById("company").value
        };
    
        // Save the collected data to sessionStorage
        sessionStorage.setItem("cardData", JSON.stringify(cardData));
    
        // Save the uploaded images to sessionStorage
        saveImageToSessionStorage("profilePic", "profilePicBase64");
        saveImageToSessionStorage("companyLogo", "companyLogoBase64");
    
        // Redirect to final.html
        window.location.href = "./final.html";
    }

    collectFormData();
});