import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js';
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getDatabase, ref, child, get } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js';
import { finalPageAuth } from './login_scripts.js';
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
    databaseURL: "https://business-card-generator-120d7-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();
const auth = getAuth();

console.log("Running final_scripts.js to initialize needed modules");

document.addEventListener('DOMContentLoaded', (event) => {
    finalPageAuth();
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        updateCard()
    } else {
        window.location.href = "../index.html"
    };
});

async function updateCard() {
    const userId = auth.currentUser;
    console.log(userId);
    console.log(userId.uid);
    const name = document.getElementById("name");
    const company = document.getElementById("company");
    const position = document.getElementById("position");
    const github = document.getElementById("github");
    const linkedin = document.getElementById("linkedin");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const skills = document.getElementById("skills");

    const dbRef = ref(database);
    
    get(child(dbRef, "cards/" + userId.uid)).then((snapshot) => {
        if (snapshot.exists()) {
            // cardData = snapshot.val();
            console.log(snapshot.val());
            console.log(snapshot.val().accountEmail);
            console.log(snapshot.val().name);
            name.textContent = snapshot.val().name;
            company.textContent = snapshot.val().company;
            position.textContent = snapshot.val().title;
            github.textContent = snapshot.val().github;
            linkedin.textContent = snapshot.val().linkedin;
            email.textContent = snapshot.val().email;
            phone.textContent = snapshot.val().phone;
            skills.textContent = snapshot.val().skills;
            // console.log(cardData.accountEmail);
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
};

