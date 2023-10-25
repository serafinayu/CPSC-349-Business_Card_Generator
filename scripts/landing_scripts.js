import { homePageAuth } from './login_scripts.js';

console.log("Running landing_scripts.js to initialize needed modules");

document.addEventListener('DOMContentLoaded', (event) => {
    homePageAuth();
});