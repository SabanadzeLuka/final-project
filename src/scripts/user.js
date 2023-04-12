// Get specific ID from page URL

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const userID = urlParams.get("id");

export { userID };

// User info navigation
const navItems = document.querySelectorAll(".profile_info_nav p");
navItems.forEach(item => {
  item.addEventListener("click", () => {
    // Remove the "active" class from all items
    navItems.forEach(navItem => {
      navItem.classList.remove('active');
    });
    // Add the "active" class to the clicked item
    item.classList.add('active');
  })
});

// Hide user CV info when clicking "Edit profile" button and reveal inputs
const userInfoCV = document.querySelector(".my_profile_no");
const userInputCV = document.querySelector(".my_profile_content_yes");
const editCVButton = document.getElementById("edit_profile_btn");
editCVButton.addEventListener("click", () => {
    userInfoCV.style.display = "none";
    userInputCV.style.display = "block";
})
