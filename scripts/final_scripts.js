import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js';
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getDatabase, ref, child, get } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js';
import { getDownloadURL, ref as sRef, getStorage, uploadBytes } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-storage.js"
import { finalPageAuth } from './login_scripts.js';
// https://firebase.google.com/docs/web/setup#available-libraries

console.log("Running final_scripts.js to initialize needed modules");

document.addEventListener('DOMContentLoaded', (event) => {
    finalPageAuth();
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
const database = getDatabase();
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
    if (user) {
        updateCard()
    } else {
        window.location.href = "../index.html"
    };
});

async function updateCard() {
    // Store the user id of the current authorized user
    const userId = auth.currentUser;
    console.log(userId);
    console.log(userId.uid);
    // Store all text field elements
    const name = document.getElementById("name");
    const company = document.getElementById("company");
    const position = document.getElementById("position");
    const github = document.getElementById("github");
    const linkedin = document.getElementById("linkedin");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const skills = document.getElementById("skills");
    // Store the image field elements
    let pic = document.getElementById("profPic");
    let logo = document.getElementById("coLogo");
    // Create a reference to the database
    const dbRef = ref(database);
    // Initialize firebase storage
    const storage = getStorage();
    
    
    // Referencing the current user's uid, get a snapshot of the data in that location of the database
    get(child(dbRef, "cards/" + userId.uid)).then((snapshot) => {
        if (snapshot.exists()) {
            // I tried to store snapshot.val() into a variable but was having issues with it
            // cardData = snapshot.val();
            // For testing purposes to the console, print some results of the snapshot
            console.log(snapshot.val());
            console.log(snapshot.val().accountEmail);
            console.log(snapshot.val().name);
            name.innerHTML = snapshot.val().name;
            company.innerHTML = snapshot.val().company;
            position.innerHTML = snapshot.val().title;
            github.innerHTML = snapshot.val().github;
            linkedin.innerHTML = snapshot.val().linkedin;   
            email.innerHTML = snapshot.val().email;
            phone.innerHTML = snapshot.val().phone;
            skills.innerHTML = snapshot.val().skills;
            
            const profPicRef = sRef(storage, "images/profilePics/" + auth.currentUser.uid + "/" + snapshot.val().profPicName)
            getDownloadURL(profPicRef).then(function(url) {
                pic.src = url;
            })
            const coLogoRef = sRef(storage, "images/companyLogos/" + auth.currentUser.uid + "/" + snapshot.val().coLogoName)
            getDownloadURL(coLogoRef).then(function(url) {
                logo.src = url;
            })
        } else {
            console.log("No data available");
            alert("You don't have a Business Card yet, create one now.");
            window.location.href = "../builder.html"
        }
    }).catch((error) => {
        console.error(error);
    });
};

// ... Your existing code

function generateDownloadableCardWithLinkedCSS() {
    const businessCardContainer = document.querySelector('.business-card-container');
    const cardContent = businessCardContainer.outerHTML;

    // Create a Blob with the HTML content
    const blob = new Blob([cardContent], { type: 'text/html' });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    return url;
}

const downloadLink = document.querySelector('#download-link');

downloadLink.addEventListener('click', function () {
    const downloadableCardURL = generateDownloadableCardWithLinkedCSS();
    this.href = downloadableCardURL;
});


