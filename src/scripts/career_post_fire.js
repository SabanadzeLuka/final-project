// import the functions from the SDK
import {initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getStorage, ref as sRef, getDownloadURL, uploadBytes,} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app); 

const currentDate = new Date();
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();
const year = currentDate.getFullYear();
const hour = currentDate.getHours();
const minute = currentDate.getMinutes()

// atvirtvis tarigi
const dateString = month + '/' + day + '/' + year + ' ' + hour + ':' + minute;
console.log(dateString);

const fileInput = document.getElementById("fileInp");
fileInput.addEventListener("change", getFile);

let fileItem;
let fileName;


function getFile(e) {
    fileItem = e.target.files[0];
    fileName = fileItem.name;
    console.log("File uploaded:", fileItem);
}







// console.log(requirementsList)
// console.log(responsibilityList)

const Vacancy_ID = Math.floor(Math.random() * 100);
console.log(Vacancy_ID);




// create new input for each responsibility (list)
const responsibilityBox = document.querySelector(".responsibility_add");
const btn_add = document.querySelector(".btn_add")

let responsibilityList = [];
let requirementsList = [];

btn_add.addEventListener("click", (e) => {
    e.preventDefault();
    const responsibilityElement = document.createElement("input");
    responsibilityElement.classList.add("form-control", "inputform", "mt-2", "responsibility_input");
    responsibilityElement.placeholder = "Enter responsibility";
    responsibilityElement.type = "text";

    responsibilityBox.appendChild(responsibilityElement);

})

// create new input for each required qualifications (list);
const requirementsBox = document.querySelector(".requirements_add");
const btn_rep_add = document.querySelector(".btn_rep_add");

btn_rep_add.addEventListener("click", (e) =>{
    e.preventDefault();
    const requirementElement = document.createElement("input");
    requirementElement.classList.add("form-control", "inputform", "mt-2", "requirement_input");
    requirementElement.placeholder = "Enter requirement";
    requirementElement.type = "text";

    requirementsBox.appendChild(requirementElement);

})


    
    // Upload other data to realtime database and storage
publish_btn.addEventListener("click", (e) => {
    const responsibilities = document.querySelectorAll(".responsibility_input");
    responsibilities.forEach(element => {
    responsibilityList.push(element.value);
});
    const requirements = document.querySelectorAll(".requirement_input");
    requirements.forEach(element => {
    requirementsList.push(element.value);
});
    const companyName = document.getElementById("exampleInputText1").value;
    const contactEmail = document.getElementById("exampleInputEmail1").value;
    const location = document.getElementById("exampleInputText2").value;
    const vacancyPosition = document.getElementById("exampleInputText3").value;
    const selectedEmployementType = document.querySelector(".selectedEmployementType").value;
    const salary = document.getElementById("exampleInputText5").value;
    const seniorityLevel = document.querySelector(".seniorityLevelType").value
    const jobDescription = document.getElementById("exampleFormControlTextarea1").value;
    e.preventDefault();
    set(ref(database, `List of Vacancies/${companyName}/${Vacancy_ID}` ), {
        CompanyName: companyName,
        email: contactEmail,
        position: vacancyPosition,
        location: location,
        EmployementType: selectedEmployementType,
        salary: salary,
        seniorityLevel: seniorityLevel,
        jobDescription: jobDescription,
        responsibilityList: responsibilityList,
        requirementsList: requirementsList,
        UploadDate: dateString,

    })
        // Image upload to Firebase Storage
   
        const storageRef = sRef(storage, `images/${companyName}/` + fileName);
        uploadBytes(storageRef, fileItem);

})

// const dateStr = '4/17/2023 7:52';
// const date = new Date(Date.parse(dateStr));
// const currentDatee = new Date();

// if (date.toDateString() === currentDatee.toDateString()) {
//   console.log('The time difference is: today');
// } else {
//   const timeDiff = currentDatee.getTime() - date.getTime();
//   const seconds = Math.floor(timeDiff / 1000);
//   const minutes = Math.floor(seconds / 60);
//   const hours = Math.floor(minutes / 60);
//   const days = Math.floor(hours / 24);

//   console.log(`${days} days`);
// }





  


