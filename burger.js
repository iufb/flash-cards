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
