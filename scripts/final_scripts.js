// Import the functions you need from the SDKs you need
// Add SDKs for Firebase products that you want to use
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js';
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getDatabase, ref, child, get } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js';
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
const database = getDatabase();
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if(user) {
        updateCard()
    } else {
        window.location.href="../index.html"
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
            // console.log(snapshot.val());
            // console.log(snapshot.val().accountEmail);
            name.innerHTML = snapshot.val().name;
            company.innerHTML = snapshot.val().company;
            position.innerHTML = snapshot.val().title;
            github.innerHTML = snapshot.val().github;
            linkedin.innerHTML = snapshot.val().linkedin;
            email.innerHTML = snapshot.val().email;
            phone.innerHTML = snapshot.val().phone;
            skills.innerHTML = snapshot.val().skills;
            // console.log(cardData.accountEmail);
        } else {
            console.log("No data available");
        }
        }).catch((error) => {
        console.error(error);
        });
};


// (function (window) {
//     const dbRef = ref(database);
    // get(child(dbRef, `users/${userId}`)).then((snapshot) => {
//     // get(dbRef, 'cards/' + uid).then((snapshot) => {
//     get(dbRef, 'cards/').then((snapshot) => {
//     if (snapshot.exists()) {
//         console.log(snapshot.val());
//     } else {
//         console.log("No data available");
//     }
//     }).catch((error) => {
//     console.error(error);
//     });
// })(window);