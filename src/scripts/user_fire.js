// import the functions from the SDK
import {initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {getDatabase, set, ref, get } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCMrLfjdUHR5exfv-TiGIdM6WxU8RjTnEo",
    authDomain: "jobpilot-25a89.firebaseapp.com",
    databaseURL: "https://jobpilot-25a89-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "jobpilot-25a89",
    storageBucket: "jobpilot-25a89.appspot.com",
    messagingSenderId: "710880147620",
    appId: "1:710880147620:web:e9aa148a5e79bd6f824e31"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);  



// user ID (uid)
import { userID } from "/src/scripts/user.js";
console.log(userID)

// user token
const token = localStorage.getItem('user');
console.log(token);


// Get User's Full name and username from realtime database and write in UserProfile box
if(token) {
    get(ref(database, "Users/" + userID))
    .then((snapshot) => {
        const user = snapshot.val()
        console.log(user)

        const fullname = document.querySelector(".fullName");
        const username = document.querySelector(".userName");

        fullname.textContent = `${user.fullname}`;
        username.textContent = `@${user.username}`; 
        
        // Get User's Full name and email from realtime database and write in CV form input (disabled)
        const inputEmail = document.getElementById("exampleInputEmail1");
        const inputFullName = document.getElementById("exampleInputText1");
        const userEmailCV = document.querySelector(".user_email_information");

        inputEmail.value = `${user.email}`;
        inputFullName.value = `${user.fullname}`;
        userEmailCV.textContent = `${user.email}`;
    })
}


