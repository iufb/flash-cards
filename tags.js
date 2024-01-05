import { customFetch, url } from "./utils.js";
import { questionsStore } from "./main.js";
import { displayCard } from "./card.js";
// const learnSelect = document.querySelector(".learn-select");
// const createSelect = document.querySelector(".create-select");
// const editSelect = document.querySelector('.edit-select')
const selects = document.querySelectorAll('.select')
export const tags = []
console.log(tags)

function fetchTags() {
  customFetch(url("tags"), (data) => {
    selects.forEach(select => {
    data.forEach((tag) => {
      tags.push(tag)
      const option = document.createElement("option");
      option.value = tag.id;
      option.textContent = tag.name;
      select.appendChild(option)
    })
    })
;
  }, {method: "GET"});
}

fetchTags();
document.querySelector('.learn-select').addEventListener("change", (e) => {
  customFetch(
    url(`cards?${new URLSearchParams({ tag: e.target.value }).toString()}`),
    (data) => {
      displayCard(data);
      questionsStore.push(...data);
    }, {method:"GET"}
  );
});
