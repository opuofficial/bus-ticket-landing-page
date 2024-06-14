const barsIcon = document.querySelector(".bars_icon");
const navLinks = document.querySelector(".nav_links");
let menuIsOpen = false;

barsIcon.addEventListener("click", () => {
  if (!menuIsOpen) {
    navLinks.style.display = "flex";
    menuIsOpen = true;
  } else {
    navLinks.style.display = "none";
    menuIsOpen = false;
  }
});
