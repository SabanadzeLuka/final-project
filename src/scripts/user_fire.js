// import the functions from the SDK

import {initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {getDatabase, set, ref, get } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

// import { jsPDF } from 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js';


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
        const head_info_name = document.querySelector(".user_info_name");

        fullname.textContent = `${user.fullname}`;
        username.textContent = `@${user.username}`; 
        head_info_name.textContent = `${user.fullname}`
        
        // Get User's Full name and email from realtime database and write in CV form input (disabled)
        const inputEmail = document.getElementById("exampleInputEmail1");
        const inputFullName = document.getElementById("exampleInputText1");
        const userEmailCV = document.querySelector(".user_email_information");

        inputEmail.value = `${user.email}`;
        inputFullName.value = `${user.fullname}`;
        userEmailCV.textContent = `${user.email}`;

        // Get User's Full name, username and email from realtime database and write in account setting's input
        const accountFullnameInput = document.getElementById("exampleAccountInputText1");
        const accountEmailInput = document.getElementById("exampleAccountInputEmail1");
        const accountUsernameInput = document.getElementById("exampleAccountInputText2");

        accountFullnameInput.value = `${user.fullname}`;
        accountEmailInput.value = `${user.email}`;
        accountUsernameInput.value = `${user.username}`


        // Gmail compose link upon clicking the icon
        const googleIconElement = document.querySelector(".googleLink");
        googleIconElement.setAttribute("href", `https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=${user.email}`);
        googleIconElement.setAttribute("target", "_blank");
    });

    // Update User's Account settings
    const accountSettingsUpdateButton = document.getElementById("update_my_account");
    accountSettingsUpdateButton.addEventListener("click", (a) => {
        a.preventDefault();
        const accountFL = document.getElementById("exampleAccountInputText1").value;
        const accountUSR = document.getElementById("exampleAccountInputText2").value;
        const accountEML = document.getElementById("exampleAccountInputEmail1").value;

        set(ref(database, "Users/" + userID), {
            fullname: accountFL,
            email: accountEML,
            username: accountUSR
        })
        .then(() => {
            location.reload();
        })
    })
   

    // Set info to realtime database when "my profile" is updated
    const updateCVButton = document.getElementById("update_my_cv");

    const locationElement = document.getElementById("exampleInputText2");
    const numberElement = document.getElementById("exampleInputNumber1");
    const dateElement = document.getElementById("exampleInputText3");
    const occupationElement = document.getElementById("exampleInputText4");
    const educationElement = document.getElementById("exampleFormControlTextarea1");
    const experienceElement = document.getElementById("exampleFormControlTextarea2");
    const languageElement = document.getElementById("exampleFormControlTextarea3");
    const skillElement = document.getElementById("exampleFormControlTextarea4");
    const linkedinElement = document.getElementById("exampleInputText5");
    const twitterElement = document.getElementById("exampleInputText6");
    const facebookElement = document.getElementById("exampleInputText7");
    const whatssapElement = document.getElementById("exampleInputText9");
    
    
    updateCVButton.addEventListener("click", (e) => {
        e.preventDefault();



    set(ref(database, "Users/" + userID + "/User's CV"), {
        Location: locationElement.value,
        Phone_number: numberElement.value,
        Date_of_birth: dateElement.value,
        Occupation: occupationElement.value,
        Education: educationElement.value,
        Experience: experienceElement.value,
        Languages: languageElement.value,
        Skills: skillElement.value,
        LinkedIn: linkedinElement.value,
        Twitter: twitterElement.value,
        Facebook: facebookElement.value,
        Whatssap: whatssapElement.value
    })
    .then(() => {
        location.reload();
    })
    })

    // Get CV infromation from realtime database
    const userLocation = document.querySelector(".user_info_location");
    const userOccupation = document.querySelector(".user_info_occupation");
    const userBirthday = document.querySelector(".user_info_birthday");
    const phoneInformation = document.querySelector(".user_phone_information");
    const userEducation = document.getElementById("user_edu_info");
    const userExperience = document.getElementById("user_exp_info");
    const userLanguage = document.getElementById("user_lng_info");
    const userSkills = document.getElementById('user_skl_info');
    const occupationProfileElement = document.querySelector(".occupation")

    
    get(ref(database, "Users/" + userID + "/User's CV"))
    .then((snapshot) => {
        if(snapshot.exists()) {
            const info = snapshot.val()
            console.log(info)
            userLocation.textContent = `${info.Location}`;
            userOccupation.textContent = `${info.Occupation}`;
            userBirthday.textContent = `${info.Date_of_birth}`;
            phoneInformation.textContent = `${info.Phone_number}`;
            userEducation.textContent = `${info.Education}`;
            userExperience.textContent = `${info.Experience}`;
            userLanguage.textContent = `${info.Languages}`;
            userSkills.textContent = `${info.Skills}`;
            occupationProfileElement.textContent = `${info.Occupation}`;

            // add info back to inputs as value
            locationElement.setAttribute("value", `${info.Location}`);
            numberElement.setAttribute("value", `${info.Phone_number}`);
            dateElement.setAttribute("value", `${info.Date_of_birth}`);
            occupationElement.setAttribute("value", `${info.Occupation}`);
            educationElement.value = `${info.Education}`;
            experienceElement.value = `${info.Experience}`;
            languageElement.value = `${info.Languages}`;
            skillElement.value = `${info.Skills}`;
            linkedinElement.setAttribute("value", `${info.LinkedIn}`);
            twitterElement.setAttribute("value", `${info.Twitter}`);
            facebookElement.setAttribute("value", `${info.Facebook}`);
            whatssapElement.setAttribute("value", `${info.Whatssap}`)

            

            // add social network link icons to profile box
            const socialNetworkLinks = document.querySelector(".social_networks");
            if (Boolean(info.LinkedIn.trim())) {
                socialNetworkLinks.innerHTML += `<a href="${info.LinkedIn}" class="bi bi-linkedin"></a>`;
              }
              if (Boolean(info.Twitter.trim())) {
                socialNetworkLinks.innerHTML += `<a href="${info.Twitter}" class="bi bi-twitter"></a>`;
              }
              if (Boolean(info.Facebook.trim())) {
                socialNetworkLinks.innerHTML += `<a href="${info.Facebook}" class="bi bi-facebook"></a>`;
              }
              if (Boolean(info.Whatssap.trim())) {
                socialNetworkLinks.innerHTML += `<a href="${info.Whatssap}" class="bi bi-whatsapp"></a>`;
              }



    

  //  Get textcontent info from CV
  
  const user_info_name = document.querySelector(".user_info_name").textContent;
  const user_info_location = document.querySelector(".user_info_location").textContent;
  const user_info_occupation = document.querySelector(".user_info_occupation").textContent;
  const user_info_birthday = document.querySelector(".user_info_birthday").textContent;

  const user_email_information = document.querySelector(".user_email_information").textContent;
  const user_phone_information = document.querySelector(".user_phone_information").textContent;


  const user_edu_info = document.getElementById("user_edu_info").textContent;
  const user_exp_info = document.getElementById("user_exp_info").textContent;
  const user_lng_info = document.getElementById("user_lng_info").textContent;
  const user_skl_info = document.getElementById("user_skl_info").textContent;
  

    // add download as PDF button
    
    const buttonOuterBox = document.querySelector(".edit_profile");
    buttonOuterBox.innerHTML += `
    <button class="button button_full" id="download_pdf">Download CV as PDF</button>
    `
    const downloadPDF = document.getElementById("download_pdf");
    downloadPDF.addEventListener("click", () => {
        const doc = new window.jspdf.jsPDF();
        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Basic Information", 20, 20);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text(`Name: ${user_info_name}`, 20, 30);
        doc.text(`Occupation: ${user_info_occupation}`, 20, 35);
        doc.text(`Residence: ${user_info_location}`, 20, 40);
        doc.text(`Date of Birth: ${user_info_birthday}`, 20, 45);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Contact Information", 20, 55);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text(`Email: ${user_email_information}`, 20, 65);
        doc.text(`Phone Number: ${user_phone_information}`, 20, 70);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Academic Qualifications", 20, 80);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text(`${user_edu_info}`, 20, 90);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Work Experience", 20, 100);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text(` ${user_exp_info}`, 20, 110);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Languages", 20, 120);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text(` ${user_lng_info}`, 20, 130);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Skills", 20, 150);

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text(` ${user_skl_info}`, 20, 160);

        doc.save(`${user_info_name}'s CV`);
    })
 
    const userInfoCV = document.querySelector(".my_profile_no");
    const userInputCV = document.querySelector(".my_profile_content_yes");
    const editCVButton = document.getElementById("edit_profile_btn");
    editCVButton.addEventListener("click", () => {
    userInfoCV.style.display = "none";
    userInputCV.style.display = "block";
})


    const saved_items = document.querySelector(".saved_items");
    
    get(ref(database, `Saved/${userID}`))
    .then((snapshot) => {
        const data = snapshot.val()
        for(let key in data) {
            const outerObj = data[key]
            console.log(outerObj)
                const companyName = outerObj.CompanyName;
                const position = outerObj.Position;
                const location = outerObj.Location;
                const link = outerObj.Link;

                saved_items.innerHTML += `
                    <div class="col-3 inner_saved_box ">
                        <p class="saved_companyname">${companyName}</p>
                        <p class="saved_position mt-3">${position}</p>
                        <span class="d-flex gap-1 align-items-center">
                            <p class="saved_location">${location}</p>
                            <i class="bi bi-geo-alt-fill"></i>
                        </span>
                        <a href="${link}">
                            <button class="viewer button button_full mt-1">View</button>
                        </a>
                    </div>
    `
        }
    })
    // const savedbox = document.querySelector(".main_saved_box");
    // savedbox.innerHTML +=`
    // <div class="col-6 mt-5 header_titles">
    //     <p>Carrefour</p>
    //     <p>Developer</p>
    //     <p>Georgia, Tbilisi</p>
    //     <p>Link</p>
    // </div>
    // `


}else{
    userLocation.textContent = `No info available`;
    userOccupation.textContent = `No info available`;
    userBirthday.textContent = `No info available`;
    phoneInformation.textContent = `No info available`;
    userEducation.textContent = `No info available`;
    userExperience.textContent = `No info available`;
    userLanguage.textContent = `No info available`;
    userSkills.textContent = `No info available`;

    
}
    })
    
   
}


