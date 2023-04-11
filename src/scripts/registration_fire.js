// import the functions from the SDK
import {initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

import {getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);


// account registration
const signUpButton = document.getElementById("signUpButton");
signUpButton.addEventListener("click", (e)=> {
    e.preventDefault();


    const fullname = document.getElementById("exampleInputText1").value;
    const email = document.getElementById("exampleInputEmail1").value;
    const username = document.getElementById("exampleInputText2").value;
    const password = document.getElementById("exampleInputPassword1").value;


    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user);


        set(ref(database, "Users/" + user.uid), {
            fullname: fullname,
            email: email,
            username: username,
        })
        .then(() => {
            window.location.href = "login.html";
        });
    })
    
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    })
});

