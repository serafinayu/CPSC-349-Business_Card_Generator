import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";
import { getDownloadURL, ref as sRef, getStorage, uploadBytes } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-storage.js"
import { builderPageAuth } from "./login_scripts.js";
// https://firebase.google.com/docs/web/setup#available-libraries

console.log("Running builder_scripts.js to initialize needed modules");

document.addEventListener("DOMContentLoaded", (event) => {
    builderPageAuth();
});

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
    databaseURL: "https://business-card-generator-120d7-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
const provider = new GoogleAuthProvider();
const emailInput = document.getElementById("email");
const emailError = document.getElementById("email-error");
const infoForm = document.getElementById("infoForm");
const storage = getStorage();

emailInput.addEventListener("input", function () {
    if (!emailInput.checkValidity()) {
        emailError.textContent = "Please enter a valid email address";
        emailError.style.display = "block"; // Show the error message
        //alert("Please enter a valid email address");
    } else {
        emailError.textContent = "";
        emailError.style.display = "none"; // Hide the error message
    }
});

// Handle form submission
infoForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const user = auth.currentUser;
    const uid = user.uid;

    const database = getDatabase();
    const name = document.getElementById("name").value;
    const github = document.getElementById("github").value;
    const linkedin = document.getElementById("linkedin").value;
    const company = document.getElementById("company").value;
    const title = document.getElementById("title").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const skills = document.getElementById("skills").value;
    // Upload images for profile pic and company logo to Firebase storage
    const userImgFile = document.getElementById("profilePic");
    const coLogoFile = document.getElementById("companyLogo");
    const userImgRef = userImgFile.files[0];
    const coLogoRef = coLogoFile.files[0];
    // Boolean for checking if image if profile pic or not
    let isProfilePic = true;

    if (userImgRef) {
        isProfilePic = true;
        uploadFile(userImgRef, isProfilePic);
    } else {
        alert("Please select a file to upload.");
    }

    if (coLogoRef) {
        isProfilePic = false;
        uploadFile(coLogoRef, isProfilePic);
    } else {
        alert("Please select a file to upload.");
    }

    // Send info to data and replace any data where current user id matches a uid
    set(ref(database, "cards/" + uid), {
        uid: uid,
        name: name,
        accountEmail: user.email,
        company: company,
        github: github,
        linkedin: linkedin,
        title: title,
        email: email,
        phone: phone,
        skills: skills,
        profPicName: userImgRef.name,
        coLogoName: coLogoRef.name
    }) // Wait 10 seconds to allow for database to be updated before reading from it 
        .then(() => {
            resolveAfter10Seconds();
            alert("Text successfully sent to database");

        window.location.href = "/../final.html";
    }) // Return error if unsuccessful write to database
    .catch((error) => {
        alert("Unsuccessful, error:" + error);
    });

});

function resolveAfter10Seconds() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Sending data to Firebase");
        }, 10000);
    });
}

// Upload file function
function uploadFile(file, isProfilePic) {

    let fileRef = "/images/";

    if (isProfilePic) {
        fileRef = "/images/profilePics/"
    } else {
        fileRef = "/images/companyLogos/"
    }

    const storageRef = sRef(storage, fileRef + auth.currentUser.uid + "/" + file.name);
    const uploadTask = uploadBytes(storageRef, file);
    
    uploadTask.then((snapshot) => {
        console.log("File uploaded successfully");
        // You can also get the download URL of the uploaded file
        getDownloadURL(storageRef)
            .then((downloadURL) => {
                console.log("Download URL:", downloadURL);
            })
            .catch((error) => {
                console.error("Error getting download URL:", error);
            });
    })
    .catch((error) => {
        console.error("Error uploading file:", error);
    });
}