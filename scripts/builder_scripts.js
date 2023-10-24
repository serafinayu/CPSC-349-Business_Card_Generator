// Import the functions you need from the SDKs you need
// Add SDKs for Firebase products that you want to use
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js';
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
    // "https://business-card-generator-120d7-default-rtdb.firebaseio.com/",
    "http://127.0.0.1:9000/?ns=business-card-generator-120d7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();
const infoForm = document.getElementById("infoForm");

// Handle form submission
infoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // var name = document.getElementById("name").value;
  const fname = document.getElementById("firstName").value;
  const lname = document.getElementById("lastName").value;
  const github = document.getElementById("github").value;
  const linkedin = document.getElementById("linkedin").value;
  const title = document.getElementById("title").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  // const skills = document.getElementById("skills").value;

  // Push data to the database
  set(ref(database, 'cards/'), {
    //   name: name,
    fname: fname,
    lname: lname,
    github: github,
    linkedin: linkedin,
    title: title,
    email: email,
    phone: phone,
    //   skills: skills
  });
  
  alert("Successful");

  window.location.href = "/../final.html";
});