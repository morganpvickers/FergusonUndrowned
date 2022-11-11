const menuToggle = document.querySelector(".toggle-container");
const menuButton = document.querySelector(".mobile-menu-button");
const mobileMenu = document.querySelector(".mobile-menu");
const list = document.querySelectorAll('.list');

menuToggle.onclick = function () {
  mobileMenu.classList.toggle("open-menu");
};
menuButton.onclick = function () {
  mobileMenu.classList.toggle("open-menu");
};

