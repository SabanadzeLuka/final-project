// display content on page load
const pageAppear = document.querySelectorAll(".page_appear");
window.addEventListener("load", () => {
    pageAppear.forEach((element) => {
        element.classList.add("show")
    });
});

// user token
const token = localStorage.getItem('user');
console.log(token);

// if token exists, hide register and log in buttons
const loginButton = document.getElementById("login_btn");
const registrationButton = document.getElementById("registration_btn")
const logoutButton = document.getElementById("logout_btn");
const userProfile = document.querySelector(".userProfile");

if(token) {
    loginButton.style.display = "none";
    registrationButton.style.display = "none";
    logoutButton.style.display = "block";
    userProfile.style.display = "block";

}


// view profile on click
const uid = localStorage.getItem("uid");


const profileView = document.querySelectorAll(".profile_view");
profileView.forEach((view) => {
    view.addEventListener("click", () => {
        window.location.href = `user.html?id=${uid}`
    })
})



