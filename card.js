import { questionsStore, cardContainer } from "./main.js";
import { openModal } from "./modal.js";
import { customFetch, url } from "./utils.js";
let currentQuestion = 0;
let answerShowed = false;
const cardContent = document.querySelector(".card");
const deleteBtn = document.querySelector(".delete-card");
const editBtn = document.querySelector(".edit-card");
function styleQuestion(question) {
  return `${question.id}. ${question.question}?`;
}
const toggleQuestion = () => {
  cardContent.addEventListener("click", (e) => {
    if (answerShowed) {
      e.target.style.transform = "rotateY(0deg)";
      e.target.textContent = styleQuestion(questionsStore[currentQuestion]);
      answerShowed = false;
    } else {
      e.target.style.transform = "rotateY(360deg)";
      e.target.textContent = questionsStore[currentQuestion].answer;
      answerShowed = true;
    }
  });
};

export const displayCard = (questions) => {
  const container = document.querySelector(".cardContainer");
  Array.from(document.querySelector(".cartControls").children).forEach(
    (child) => {
      if (questions.length <= 1) {
        child.setAttribute("disabled", true);
      } else {
        child.removeAttribute("disabled");
      }
    }
  );
  if (container.querySelector("h2")) {
    container.querySelector("h2").remove();
  }
  if (questions.length == 0) {
    cardContent.textContent = "Cards not found.";
    cardContent.classList.add("error");
    questionsStore.splice(0, questionsStore.length);
  } else {
    cardContent.classList.remove("error");

    const questionCount = document.createElement("h2");
    questionCount.textContent = `Questions count:  ${questions.length}.`;
    container.appendChild(questionCount);

    cardContent.textContent = styleQuestion(questions[currentQuestion]);

    cardContainer.appendChild(cardContent);
  }
};
const createCardControls = () => {
  const cardControls = document.querySelector(".cartControls");
  cardControls.addEventListener("click", (e) => {
    if (questionsStore.length <= 1) {
      e.target.setAttribute("disabled", true);
    } else {
      e.target.removeAttribute("disabled");
    }
    if (e.target.dataset.direction == "back") {
      if (currentQuestion <= 0) {
        currentQuestion = questionsStore.length - 1;
      } else {
        currentQuestion -= 1;
      }
    }
    if (e.target.dataset.direction == "forward") {
      if (currentQuestion >= questionsStore.length - 1) {
        currentQuestion = 0;
        console.log(questionsStore.length, currentQuestion);
      } else {
        currentQuestion += 1;
      }
    }
    document.querySelector(".card").textContent = answerShowed
      ? questionsStore[currentQuestion].answer
      : styleQuestion(questionsStore[currentQuestion]);
  });
};

const deleteCard = customFetch(url("card"), {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
  },
});
deleteBtn.addEventListener("click", () => {
  openModal(_, () => {
    const answer = confirm("Are you sure you want to delete this card?");
    if (answer) {
      deleteCard();
    } else {
      document.querySelector(".modal").style.display = "none";
    }
  });
});
createCardControls();
toggleQuestion();
