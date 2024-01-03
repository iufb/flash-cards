const headerRight = document.querySelector(".header-right");

const burgetBtn = document.querySelector(".burger");
burgetBtn.addEventListener("click", () => {
  burgetBtn.classList.toggle("change");
  if (!burgetBtn.classList.contains("change")) {
    headerRight.style.display = "none";
  } else {
    headerRight.style.display = "flex";
  }
});
window.addEventListener("resize", () => {
  if (window.innerWidth > 700) {
    headerRight.style.display = "flex";
  } else {
    headerRight.style.display = "none";
  }
});
