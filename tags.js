import { customFetch, url } from "./utils.js";
import { questionsStore } from "./main.js";
import { displayCard } from "./card.js";
const select = document.querySelectorAll(".select");
function fetchTags() {
  customFetch(url("tags"), (data) => {
    console.log(data);
    data.forEach((tag) => {
      const option = document.createElement("option");
      option.value = tag.id;
      option.textContent = tag.name;
      select.forEach(s => {
      s.appendChild(option);
      })
    });
  });
}

fetchTags();
select.forEach((select) => {
  select.addEventListener("change", (e) => {
    customFetch(
      url(`cards?${new URLSearchParams({ tag: e.target.value }).toString()}`),
      (data) => {
        displayCard(data);
        questionsStore.push(...data);
      }
    );
  });
});
