// import the functions from the SDK
import {initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {getAuth, signOut} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

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
  const auth = getAuth(app);
   
const logoutButton = document.getElementById("logout_btn");

logoutButton.addEventListener('click', () => {
    auth.signOut().then(() => {
      localStorage.removeItem('user');
      window.location.href = 'index.html';
    }).catch((error) => {
      console.log(error);
    });
  });