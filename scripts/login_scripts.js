// Import the functions you need from the SDKs you need
// Add SDKs for Firebase products that you want to use
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";
import { getDatabase, ref, set, get } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js';
// https://firebase.google.com/docs/web/setup#available-libraries

// Authentication function for Home page only
export function homePageAuth() {
    console.log("Running function GoogleLogin()");

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
    const loginBtn = document.getElementById("loginButton");

    // Apply the default browser's preferred language
    auth.useDeviceLanguage();

    // Async function in a variable, which returns the authenticated user as the promise
    const userSignIn = async () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log(user);
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            })
    }

    // Async function in a variable, which promises to sign the authenticated user out
    const userSignOut = async () => {
        signOut(auth).then(() => {
            alert("You have signed out successfully");
        }).catch((error) => { })
    }

    // Custom buttons for Home page
    const createBtn = document.getElementById("createBtn");
    createBtn.style.display = "none";
    const seeMyBusinessCardBtn = document.getElementById("seeMyBusinessCardBtn");
    seeMyBusinessCardBtn.style.display = "none"

    onAuthStateChanged(auth, (user) => {
        if (user) {
            loginBtn.innerHTML = "Log Out";
            //alert("You have signed in as " + user.displayName);
            alert("You have signed in as " + user.email);
            loginBtn.removeEventListener("click", userSignIn);
            loginBtn.removeEventListener("click", userSignOut);
            loginBtn.addEventListener("click", userSignOut);
            createBtn.style.display = "block";
            seeMyBusinessCardBtn.style.display = "block"
            //createBtn.addEventListener("click", window.location.href="/builder.html")
        } else {
            loginBtn.innerHTML = "Login/Sign Up";
            loginBtn.removeEventListener("click", userSignIn);
            loginBtn.removeEventListener("click", userSignOut);
            loginBtn.addEventListener("click", userSignIn);
            createBtn.style.display = "none";
            seeMyBusinessCardBtn.style.display = "none"
        }
    })
}

// Authentication function for Builder page only
export function builderPageAuth() {
    console.log("Running function GoogleLogin()");

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
    const loginBtn = document.getElementById("loginButton");

    // Apply the default browser's preferred language
    auth.useDeviceLanguage();

    // Async function in a variable, which returns the authenticated user as the promise
    const userSignIn = async () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log(user);
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            })
    }

    // Async function in a variable, which promises to sign the authenticated user out
    const userSignOut = async () => {
        signOut(auth).then(() => {
            alert("You have signed out successfully");
            window.location.href = "../index.html"
        }).catch((error) => { })
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            loginBtn.innerHTML = "Log Out";
            loginBtn.removeEventListener("click", userSignIn);
            loginBtn.removeEventListener("click", userSignOut);
            loginBtn.addEventListener("click", userSignOut);
        } else {
            window.location.href = "../index.html"
        }
    })
}

// Authentication function for Final page only
export function finalPageAuth() {
    console.log("Running function GoogleLogin()");

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
    const loginBtn = document.getElementById("loginButton");

    // Apply the default browser's preferred language
    auth.useDeviceLanguage();

    // Async function in a variable, which returns the authenticated user as the promise
    const userSignIn = async () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log(user);
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            })
    }

    // Async function in a variable, which promises to sign the authenticated user out
    const userSignOut = async () => {
        signOut(auth).then(() => {
            alert("You have signed out successfully");
            window.location.href = "../index.html"
        }).catch((error) => { })
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            loginBtn.innerHTML = "Log Out";
            loginBtn.removeEventListener("click", userSignIn);
            loginBtn.removeEventListener("click", userSignOut);
            loginBtn.addEventListener("click", userSignOut);
        } else {
            window.location.href = "../index.html"
        }
    })
}
