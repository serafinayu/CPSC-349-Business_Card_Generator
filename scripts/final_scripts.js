function displayCardData() {
    // Retrieve the data from sessionStorage
    let cardData = JSON.parse(sessionStorage.getItem("cardData"));

    if (cardData) {
        // Use the data to populate the business card
        document.querySelector(".name").textContent = cardData.firstName + " " + cardData.lastName;
        document.querySelector(".github").textContent = cardData.github;
        document.querySelector(".linkedin").textContent = cardData.linkedin;
        document.querySelector(".email").textContent = cardData.email;
        document.querySelector(".phone").textContent = cardData.phone;
        document.querySelector(".position").textContent = cardData.title;
        document.querySelector(".skills-desc").textContent = cardData.skills;
        document.querySelector(".company").textContent = cardData.company;
    }
    const profilePicBase64 = sessionStorage.getItem("profilePicBase64");
    if (profilePicBase64) {
        document.querySelector(".profile-pic").src = profilePicBase64;
    }

    const companyLogoBase64 = sessionStorage.getItem("companyLogoBase64");
    if (companyLogoBase64) {
        document.querySelector(".company-logo").src = companyLogoBase64;
    }
}

// Call the function to display the card data
displayCardData();