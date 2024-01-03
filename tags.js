import { customFetch, url } from "./utils.js";
import { questionsStore } from "./main.js";
import { displayCard } from "./card.js";
const learnSelect = document.querySelector(".learn-select");
const createSelect = document.querySelector(".create-select");

function fetchTags() {
  customFetch(url("tags"), (data) => {
    console.log(data);
    data.forEach((tag) => {
      const optionLearn = document.createElement("option");
      optionLearn.value = tag.id;
      optionLearn.textContent = tag.name;

      const optionCreate = document.createElement("option");
      optionCreate.value = tag.id;
      optionCreate.textContent = tag.name;

      learnSelect.appendChild(optionLearn);
      createSelect.appendChild(optionCreate);
    });
  });
}

fetchTags();
learnSelect.addEventListener("change", (e) => {
  customFetch(
    url(`cards?${new URLSearchParams({ tag: e.target.value }).toString()}`),
    (data) => {
      displayCard(data);
      questionsStore.push(...data);
    }
  );
});
