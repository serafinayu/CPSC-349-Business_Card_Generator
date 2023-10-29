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

// Function to generate download of the Business card in HTML file
// function generateDownloadableCardWithLinkedCSS() {
//     const businessCardContainer = document.querySelector('.business-card-container');
//     const cardContent = document.createElement('html');
//     const html = document.createElement('html');

//     // Clone the business card container to ensure you don't modify the original
//     const clonedBusinessCard = businessCardContainer.cloneNode(true);

//     // Create a <style> element and set the CSS content
//     const styleElement = document.createElement('style');
//     styleElement.textContent = `
//     /* font-family: 'ADLaM Display'; */
//     @import url('https://fonts.googleapis.com/css2?family=ADLaM+Display&display=swap');
//     /* font-family: 'Courier Prime', monospace; */
//     @import url('https://fonts.googleapis.com/css2?family=Courier+Prime&display=swap');
    
//     html,
//     body {
//         /* Sets the website to always occupy 100% of the height of the viewport */
//         height: 100%;
//     }
    
//     body {
//         /* Sets the website to Flexbox */
//         font-size: 20px;
//         /* Defines the gradient background of the website */
//         /* background: linear-gradient(180deg, #535E64 9.9%, rgba(83, 94, 100, 0.00) 100%); */
//         background: linear-gradient(180deg, rgba(170, 170, 170, 1) 9.9%, #535E64 100%);
//         background-attachment: fixed;
            
//         background-color: #fff;
//         display: flex;
//         justify-content: center;
//         align-items: center;
//         height: 100vh;
        
//     }
    
//     /* Styling for the logo-text */
//     .main-header {
//         flex: 0 1 auto;
//     }
    
//     #subtitle {
//         font-family: 'Courier Prime', monospace;
//         color: #FFFFFF;
//         font-size: 40px;
//         text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
//     }
    
//     /* Sets flexbox properties of main content */
//     .main-content {
//         flex: 1 1 auto;
//         display: flex;
//         flex-direction: column;
//         justify-content: center;
//         flex-wrap: wrap;
//         align-items: center;
//     }
    
//     /* Styling for the Business Card */
//     .business-card-container {
//         flex-shrink: 0;
//         width: 735px;
//         /* proportion 1.75:1.00 */
//         height: 420px;
//         margin-right: 40px;
    
//         border-radius: 30px;
//         border: 1px solid #000;
//         background: #2A292C;
//     }
    
//     /* Add hover effect for the business card */
//     .business-card-container:hover {
//         box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.5);
//         transition: box-shadow 0.3s ease;
//     }
    
//     .info-container {
//         display: flex;
//         flex-direction: row;
//         justify-content: space-between;
    
//         position: relative;
//         margin-top: 40px;
//     }
    
//     .profile-pic-container {
//         position: relative;
//         margin-left: 40px;
//     }
    
//     .profile-pic {
//         width: 150px;
//     }
    
//     .details-container {
//         position: relative;
//         width: 340px;
//         margin-left: 5px;
//         margin-right: 25px;
    
//         color: white;
//         text-align: left;
//         font-family: 'Courier Prime', monospace;
//     }
    
//     .name {
//         font-size: 26px;
//         font-weight: 700;
//     }
    
//     .company,
//     .position {
//         font-size: 16px;
//         font-weight: 400;
//     }
    
//     .github,
//     .linkedin,
//     .email,
//     .phone {
//         font-size: 16px;
//         font-weight: 400;
//     }
    
//     .github-icon,
//     .linkedin-icon,
//     .email-icon,
//     .phone-icon {
//         display: inline-block;
//         object-fit: contain;
//         height: 15px;
//         width: 30px;
//     }
    
//     .company-logo-container {
//         position: relative;
//         margin-right: 40px;
//     }
    
//     .company-logo {
//         width: 100px;
//     }
    
//     .about-container {
//         position: relative;
//         margin-top: 30px;
//         margin-left: 60px;
//         margin-right: 60px;
//     }
    
//     .skills-text {
//         color: white;
//         text-align: left;
//         font-family: 'Courier Prime', monospace;
//     }
    
//     .skills-label,
//     .skills-desc {
//         font-size: 16px;
//         font-weight: 400;
//     }

//     `;

//     // Append the <style> element and the cloned business card content
//     cardContent.appendChild(styleElement);
//     cardContent.appendChild(clonedBusinessCard);

//     // Create a Blob with the HTML content
//     const blob = new Blob([cardContent.outerHTML], { type: 'text/html' });

//     // Create a URL for the Blob
//     const url = URL.createObjectURL(blob);

//     return url;
// }

// const downloadLink = document.querySelector('#download-link');

// downloadLink.addEventListener('click', function () {
//     const downloadableCardURL = generateDownloadableCardWithLinkedCSS();
//     this.href = downloadableCardURL;
// });

document.getElementById('download-link').addEventListener('click', generateImage);

function generateImage() {
    var element = document.querySelector('.business-card-container');

    html2canvas(element).then(canvas => {
        var imgData = canvas.toDataURL('image/png');
        var link = document.createElement('a');
        link.download = 'business-card.png';
        link.href = imgData;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}