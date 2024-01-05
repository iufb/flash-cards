import { customFetch, url } from './utils.js'
import { displayCard } from './card.js';
export const questionsStore = []
export const nav = document.querySelector(".navlist");
export const form = document.querySelector(".createForm");
export const cardContainer = document.querySelector(".cardContainer");

let mode = "learn";
const fetchQuestions = () => {
  customFetch(url("cards"), (data) => {
    questionsStore.push(...data)
    displayCard(data)
  }, {method: "GET"});
};
nav.addEventListener("click", (e) => {
  if (e.target.tagName == "LI") {
    nav.querySelectorAll("li").forEach((li) => {
      if (li.classList.contains("navlink-active")) {
        li.classList.remove("navlink-active");
      }
    });
    e.stopPropagation();
    e.target.classList.add("navlink-active");
    mode = e.target.textContent.toLowerCase();
    showPageContent();
  }
});
const showPageContent = () => {
  if (mode == "learn") {
    cardContainer.style.display = "flex";
    form.style.display = "none";
  } else {
    cardContainer.style.display = "none";
    form.style.display = "flex";
  }
};
const loader = () => {
  const loader = document.querySelector('.loader')
  setTimeout(() => {
    loader.remove()
  }, 2000)
};
loader()
fetchQuestions();
showPageContent();

