// import the functions from the SDK
import {initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {getAuth, signOut} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
import { getStorage, ref as sRef, getDownloadURL, uploadBytes, listAll} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js";
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
const storage = getStorage(app); 
   
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
  const jobPosting = document.getElementById("post_job");
  jobPosting.addEventListener("click", () => {
    window.location.href = "carrer_post.html";
  })
}





const available_vacancy = document.querySelector(".available_vacancy")
get(ref(database, `List of Vacancies/`))
.then((snapshot) => {
  const listedVacancy = snapshot.val()

    const allAvailableVacancies = Object.keys(listedVacancy).length;
    console.log(allAvailableVacancies)
    available_vacancy.innerHTML += `
    <div class="mt-5">
      <p class="vacancies_count">Available Vacancies: ${allAvailableVacancies}</p>
    </div>
    `
 
 
  for (let key in listedVacancy) {
    const outerObj = listedVacancy[key];
    console.log(outerObj)
  
    for (let innerKey in outerObj) {
      const innerObj = outerObj[innerKey];
      // console.log(innerObj);
      const CompanyName = innerObj.CompanyName;
      const position = innerObj.position
      const EmployementType = innerObj.EmployementType
      const salary = innerObj.salary
      const location = innerObj.location
      const UploadDate = innerObj.UploadDate
      const URL = innerObj.URL

      
      
      available_vacancy.innerHTML += `
      <div class="col-4 mt-5 vacancy_box d-flex justify-content-center" data-id="${CompanyName}" ">
      <div class="vacancy_inner_box d-flex justify-content-between align-items-center gap-2">
          <div class="vacancy_logo_box">
              <div class="inner_logo d-flex justify-content-center align-items-center">
              <img src="${URL}">
              </div>
          </div>
          <div class="vacancy_info_box d-flex flex-column gap-2">
              <p class="company_name">${CompanyName}</p>
              <span class="d-flex items_list gap-1 ">
                <p>${position}</p>
                <i class="bi bi-circle-fill d-flex justify-content-center align-items-center"></i>
                <p>${EmployementType}</p>
              </span>
              <p class="salary">${salary}</p>
              <span class="d-flex gap-1 second_list">
                <i class="bi bi-geo-alt-fill d-flex justify-content-center align-items-center"></i>
                <p class="location">${location}</p>
              </span>
          </div>
          <div class="vacancy_rest_box d-flex flex-column justify-content-between">
          <i class="bi bi-bookmark-plus-fill text-center" data-id="${CompanyName}" position-id="${position}" location-id="${location}"></i>
              <p class="date">${UploadDate}</p>
          </div>
      </div>
  </div>
      `;
      

      // axal pageze gadasvla
      const vacancy_box = available_vacancy.querySelectorAll(".vacancy_box");
      vacancy_box.forEach(element => {
        element.addEventListener("click", () => {
          const companyID = element.getAttribute("data-id");
          window.open(`career_info.html?company=${companyID}`, '_blank');
        })
      });
     
      // bookmarkis gaketeba da databesshi shenaxva
      const vacancy_save = available_vacancy.querySelectorAll(".bi-bookmark-plus-fill");
      vacancy_save.forEach(save => {
        save.addEventListener("click", () => {
          const savedCompanyKey = save.getAttribute("data-id");
          const savedpositionKey = save.getAttribute("position-id");
          const savedlocationKey = save.getAttribute("location-id")
          console.log(savedCompanyKey);
      
          set(ref(database, `Saved/${uid}/${savedCompanyKey}`), {
            CompanyName: `${savedCompanyKey}`,
            Position: `${savedpositionKey}`,
            Location: `${savedlocationKey}`,
            Link: `career_info.html?company=${savedCompanyKey}`
          });
        });
      });
      
      


// // Create a storage reference to the images directory for the specified company
// const imagesRef = sRef(storage, `images/${CompanyName}`);

// // Get a list of all the image files in the images directory
// listAll(imagesRef)
//   .then((result) => {
//     // Loop through each item in the list
//     result.items.forEach((item) => {
//       console.log(item)
//       // Get the download URL for the item
//       getDownloadURL(item).then((url) => {
//         console.log(url);
//       });
//     });
//   });


    }
  }
  
})




  