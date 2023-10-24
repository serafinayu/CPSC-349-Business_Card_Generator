// Import the functions you need from the SDKs you need
// Add SDKs for Firebase products that you want to use
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getDatabase, ref, set, get } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuFs8e9otYS84DrXUnsbDxP59aay2rfI0",
  authDomain: "business-card-generator-120d7.firebaseapp.com",
  projectId: "business-card-generator-120d7",
  storageBucket: "business-card-generator-120d7.appspot.com",
  messagingSenderId: "230677413050",
  appId: "1:230677413050:web:58be376af87566665e5683",
  measurementId: "G-87VKWPXR2B",
  databaseURL:
    "https://business-card-generator-120d7-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

(function (window) {
    const dbRef = ref(getDatabase());
    // get(child(dbRef, `users/${userId}`)).then((snapshot) => {
    get(dbRef, `users/`).then((snapshot) => {
    if (snapshot.exists()) {
        console.log(snapshot.val());
    } else {
        console.log("No data available");
    }
    }).catch((error) => {
    console.error(error);
    });
})(window);

// function displayCardData() {
//     // Retrieve the data from sessionStorage
//     let cardData = JSON.parse(sessionStorage.getItem("cardData"));
//
//     if (cardData) {
//         // Use the data to populate the business card
//         document.querySelector(".name").textContent = cardData.firstName + " " + cardData.lastName;
//         document.querySelector(".github").textContent = cardData.github;
//         document.querySelector(".linkedin").textContent = cardData.linkedin;
//         document.querySelector(".email").textContent = cardData.email;
//         document.querySelector(".phone").textContent = cardData.phone;
//         document.querySelector(".position").textContent = cardData.title;
//         document.querySelector(".skills-desc").textContent = cardData.skills;
//         document.querySelector(".company").textContent = cardData.company;
//     }
//     const profilePicBase64 = sessionStorage.getItem("profilePicBase64");
//     if (profilePicBase64) {
//         document.querySelector(".profile-pic").src = profilePicBase64;
//     }
//
//     const companyLogoBase64 = sessionStorage.getItem("companyLogoBase64");
//     if (companyLogoBase64) {
//         document.querySelector(".company-logo").src = companyLogoBase64;
//     }
// }
//
// // Call the function to display the card data
// displayCardData();