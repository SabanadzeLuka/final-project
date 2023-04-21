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

const content = document.querySelectorAll(".content");
const content1 = document.getElementById("content-1")
const content2 = document.getElementById("content-2");
const content3 = document.getElementById("content-3");

content2.style.display = "none";
content3.style.display = "none";

// Hide content items not associated with the my_profile (content-2, content-3)
const userProfileNavItem = document.querySelector(".my_profile");
userProfileNavItem.addEventListener("click", () => {
  content1.style.display = "block";
  content2.style.display = "none";
  content3.style.display = "none";
})

// Hide content items not associated with the account_settings (content-1, content-3)
const userAccountsettingsNavItem = document.querySelector(".account_settings");
userAccountsettingsNavItem.addEventListener("click", () => {
  content1.style.display = "none";
  content2.style.display = "block";
  content3.style.display = "none";
})

// Hide content items not associated with the bookmarks (content-1, content-2)
const userBookmarksNavItem = document.querySelector(".bookmarks");
userBookmarksNavItem.addEventListener("click", () => {
  content1.style.display = "none";
  content2.style.display = "none";
  content3.style.display = "block";
})

// Hide user CV info when clicking "Edit profile" button and reveal inputs
const userInfoCV = document.querySelector(".my_profile_no");
const userInputCV = document.querySelector(".my_profile_content_yes");
const editCVButton = document.getElementById("edit_profile_btn");
editCVButton.addEventListener("click", () => {
    userInfoCV.style.display = "none";
    userInputCV.style.display = "block";
})


// burger menu
const burgerMenu = document.querySelector(".burgerMenu");
const nav_items = document.querySelector(".profile_info_nav");

burgerMenu.addEventListener("click", () => {
  nav_items.classList.toggle("profile_info_nav--hidden");
});





