import { customFetch, url } from "./utils.js";
import { questionsStore } from "./main.js";
import { displayCard } from "./card.js";
const searchInput = document.querySelector(".search");
const searchCards = () => {
  if (searchInput.value.trim() == "") return;
  customFetch(
    url(
      `cards?${new URLSearchParams({
        question: searchInput.value,
      }).toString()}`
    ),
    (data) => {
      displayCard(data);
      questionsStore.splice(0, questionsStore.length);
      questionsStore.push(...data);
    }, {method: 'GET'}
  );
  searchInput.value = "";
};

document.querySelector(".searchButton").addEventListener("click", searchCards);
