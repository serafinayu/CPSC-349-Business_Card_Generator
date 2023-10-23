// Import the functions you need from the SDKs you need
// Add SDKs for Firebase products that you want to use
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js";
import { getDatabase, ref, set } from "firebase/database";
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
const database = getDatabase(app);
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
  db.ref("users").push({
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

  alert("Form submitted successfully!");

  // Clear the form
  infoForm.reset();
});

// infoForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const fname = document.getElementById('firstName').nodeValue;
//     const lname = document.getElementById('lastName');
//     const title = document.getElementById('title');
//     const githubUrl = document.getElementById('github');
//     const linkedinUrl = document.getElementById('linkedin');
//     const email = document.getElementById('email');
//     const phone = document.getElementById('phont');
//     const db = getDatabase();

//     // set(ref(db, 'users/' + uid), {
//     //     fname: fname,
//     //     lname: lname,
//     //     title: title,
//     //     github: githubUrl,
//     //     linkedin: linkedinUrl,
//     //     email: email,
//     //     phone: phone,
//     //     // profile_picture : imageUrl
//     // });
//     // document.location.href = "/../final.html";

//     set(ref(db, 'users/'), {
//         fname: fname,
//         lname: lname,
//         title: title,
//         github: githubUrl,
//         linkedin: linkedinUrl,
//         email: email,
//         phone: phone,
//         // profile_picture : imageUrl
//     });
//     document.location.href = "/../final.html";

// })

// function writeBusinessCard(uid, firstName, lastName, title, githubUrl, linkedinUrl, email, phone) {
//     const db = getDatabase();
//     set(ref(db, 'users/' + uid), {
//         fname: firstName,
//         lname: lastName,
//         title: title,
//         github: githubUrl,
//         linkedin: linkedinUrl,
//         email: email,
//         phone: phone,
//         // profile_picture : imageUrl
//     });
//     document.location.href = "/../final.html";
// }

// document.querySelector('#submit').addEventListener('click', ()=>{
//     const fname = document.getElementById('firstName');
//     const lname = document.getElementById('lastName');
//     const title = document.getElementById('title');
//     const github = document.getElementById('github');
//     const linkedin = document.getElementById('linkedin');
//     const email = document.getElementById('email');
//     const phone = document.getElementById('phont');
//     firebaseRef.push()
// })
