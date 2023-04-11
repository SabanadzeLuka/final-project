// Get specific ID from page URL

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const userID = urlParams.get("id");

export { userID };