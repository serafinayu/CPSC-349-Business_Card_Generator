import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getDatabase, ref, set, get } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js';
import { builderPageAuth } from './login_scripts.js';

console.log("Running builder_scripts.js to initialize needed modules");

document.addEventListener('DOMContentLoaded', (event) => {
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
    const firebaseApp = initializeApp(firebaseConfig);
    const analytics = getAnalytics(firebaseApp);
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const database = getDatabase();

    const infoForm = document.getElementById("infoForm");

// Handle form submission
infoForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const user = auth.currentUser;
    const uid = user.uid;

    const name = document.getElementById("name").value;
    const github = document.getElementById("github").value;
    const linkedin = document.getElementById("linkedin").value;
    const company = document.getElementById("company").value;
    const title = document.getElementById("title").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const skills = document.getElementById("skills").value;

    // Push data to the database
    set(ref(database, 'cards/' + uid), {
        uid: uid,
        name: name,
        accountEmail: user.email,
        company: company,
        github: github,
        linkedin: linkedin,
        title: title,
        email: email,
        phone: phone,
        skills: skills
    });

    resolveAfter10Seconds();
    alert("Successful");

    window.location.href = "/../final.html";
});

function resolveAfter10Seconds() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Sending data to Firebase');
        }, 10000);
    });
}