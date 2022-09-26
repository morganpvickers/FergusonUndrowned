const menuToggle = document.querySelector(".menuToggle");
const navigation = document.querySelector(".navigation");
const list = document.querySelectorAll('.list');

function activeLink() {
  list.forEach((item) =>
              item.classList.remove('active'));
  this.classList.add('active');
}

menuToggle.onclick = function () {
  navigation.classList.toggle("open");
};

list.forEach((item) => item.addEventListener('click', activeLink));
