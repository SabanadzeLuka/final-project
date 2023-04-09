const pageAppear = document.querySelectorAll(".page_appear");
window.addEventListener("load", () => {
    pageAppear.forEach((element) => {
        element.classList.add("show")
    });
});