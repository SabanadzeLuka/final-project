// import the functions from the SDK
import {initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {getAuth} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";
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

const career_main_box = document.querySelector(".career_main_box")

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const companyID = urlParams.get('company');
console.log(companyID)

get(ref(database, `List of Vacancies/${companyID} `))   
.then((snapshot) => {
    if(snapshot.exists()) {
        const data = snapshot.val();
        console.log(data)
        for(let key in data) {
            const innerData = data[key]
            console.log(innerData)
            career_main_box.innerHTML += `
            <div class="col-10 main_info_box">
                <div class="banner_logo"></div>
                <div class="row d-flex col-12 inner_box">
                    <div class="col-9 left-box">
                        <div class="banner_inner d-flex justify-content-between align-items-center">
                            <div class="col-2 d-flex justify-content-start align-items-center">
                                <div class="logobox">
                                <img src="${innerData.URL}">
                                </div>                       
                            </div>
                            <div class="col-7 middle_info_banner">
                                <p class="info_position">${innerData.position}</p>
                                <p class="info_companyname">${innerData.CompanyName}</p>                           
                            </div>
                            <div class="col-3 d-flex right_info_banner justify-content-end">
                                <span class="type">
                                    <p class="info_seniority_level text-center">${innerData.seniorityLevel}</p>
                                </span>                        
                            </div>
                        </div>
                        <div class="content_info mt-3">
                            <h4 class="header">
                                Job Description
                            </h4>
                            <p class="content">${innerData.jobDescription}</p>
                        </div>
                        <div class="content_info mt-5">
                            <h4 class="header">
                                Key Responsibilities
                            </h4>
                            <p class="content req_content"></p>
                        </div>
                        <div class="content_info mt-5">
                            <h4 class="header">
                                Required Qualifications
                            </h4>
                            <p class="content qual_content"></p>
                        </div>
                    </div>
                    <div class="col-3 mt-4 right_content">
                        <div class="halfed">
                            <p class="right_info">Company Information</p>
                            <div class="mt-3">
                                <p class="right_company_name_header">Company Name</p>
                                <p class="right_company_name mt-1">${innerData.CompanyName}</p>
                            </div>
                            <div class="mt-3">
                                <p class="right_company_name_header">Location</p>
                                <p class="right_company_name mt-1">${innerData.location}</p>
                            </div>
                            <div class="mt-3">
                                <p class="right_company_name_header">Contact</p>
                                <p class="right_company_name mt-1">${innerData.email}</p>
                            </div>
                        </div>
                        
                        <div class="halfed">
                            <p class="right_info mt-4">Vacancy Information</p>
                            <div class="mt-3">
                                <p class="right_company_name_header">Position</p>
                                <p class="right_company_name mt-1">${innerData.position}</p>
                            </div>
                            <div class="mt-3">
                                <p class="right_company_name_header">Seniority Level</p>
                                <p class="right_company_name mt-1">${innerData.seniorityLevel}</p>
                            </div>
                            <div class="mt-3">
                                <p class="right_company_name_header">Employement Type</p>
                                <p class="right_company_name mt-1">${innerData.EmployementType}</p>
                            </div>
                            <div class="mt-3">
                                <p class="right_company_name_header">Salary</p>
                                <p class="right_company_name mt-1">${innerData.salary}</p>
                            </div>
                            <div class="mt-3">
                                <p class="right_company_name_header">Upload Time</p>
                                <p class="right_company_name mt-1">${innerData.UploadDate}</p>
                            </div>
                        </div>

                        <div class="halfed mt-4 d-flex justify-content-center align-items-center">
                            <button class="apply">Apply</button>
                        </div>
                    </div>
                </div>
            </div>
            `
            const reqContents = document.querySelectorAll(".req_content")
            const requirements = data[key].responsibilityList
            // console.log(requirements)
            reqContents.forEach(reqContent => {
                reqContent.innerHTML = "<ul></ul>"; 
                const ul = reqContent.querySelector("ul");
                requirements.forEach(requirement => {
                    // console.log(requirement)
                    const li = document.createElement("li"); 
                    li.textContent = requirement;
                    ul.appendChild(li); 
                });
            });
            

            const qualContents = document.querySelectorAll(".qual_content")
            const qualifications = data[key].requirementsList
            // console.log(qualifications)
            qualContents.forEach(qualContent => {
                qualContent.innerHTML = "<ul></ul>"
                const ul = qualContent.querySelector("ul")
                qualifications.forEach(qualification => {
                    // console.log(qualification)
                    const li = document.createElement("li");
                    li.textContent = qualification;
                    ul.appendChild(li);
                })
            })


            const applyButton = career_main_box.querySelector(".apply");
            applyButton.addEventListener("click", () => {
                window.open(`https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=${innerData.email}`, '_blank')
            })
            
        };
 
    }
})