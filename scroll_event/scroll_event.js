const hiddenText = document.querySelector(".hidden");

function checkScroll() {
  const windowHeight = window.innerHeight;
  const scrollY = window.scrollY || window.pageYOffset;

  if (hiddenText.getBoundingClientRect().top < windowHeight * 0.7) {
    hiddenText.classList.add("visible");
    hiddenText.classList.remove("hidden");
    window.removeEventListener("scroll", checkScroll);
  }
}
window.addEventListener("scroll", checkScroll);
