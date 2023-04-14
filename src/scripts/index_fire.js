// import the functions from the SDK
import {initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {getAuth, signOut} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

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
const auth = getAuth(app);
const database = getDatabase(app);
   
const logoutButton = document.getElementById("logout_btn");

logoutButton.addEventListener('click', () => {
    auth.signOut().then(() => {
      localStorage.removeItem('user');
      window.location.href = 'index.html';
    }).catch((error) => {
      console.log(error);
    });
  });

// get user data from firebase realtime database  
const token = localStorage.getItem('user');
const uid = localStorage.getItem("uid");

const fullnameElement = document.querySelector(".full_name");
const usernameElement = document.querySelector(".user_name");


if(token) {
  get(ref(database, "Users/" + uid))
.then((snapshot) => {
  if(snapshot.exists()) {
    const user = snapshot.val()
    console.log(user)
    fullnameElement.textContent = `${user.fullname}`
    usernameElement.textContent = `@${user.username}`
  }
})

// add job posting button when user is signed
  const jobpostbtn_box = document.querySelector(".jobpostbtn_box")
  jobpostbtn_box.innerHTML = `
  <div class="col-8 d-flex row">
  <div class="text-box d-flex justify-content-center align-items-center">
      <p class="job_post_text">To publish a career opportunity, please click the  button.</p>
  </div>
  <div class="post_job_box d-flex justify-content-center align-items-center">
      <button class="button button_full" id="post_job">Post a job</button>
  </div>
</div>
  `
}




  