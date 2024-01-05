import { tags } from "./tags.js";
import { customFetch, url } from "./utils.js";

const modal = document.querySelector(".modalContainer");

export const openModal = (children) => {
  modal.style.display = "flex";
  if (children) {
    modal.appendChild(children);
  }
};

export const createDeleteModal = (deleteFn) => {
  const deleteModal = document.createElement("div");
  deleteModal.classList.add("modal");
  deleteModal.innerHTML = `
     <h1>Are you sure you want to delete this card?</h1>
     <div style="display:flex;justify-content:space-between;align-items:center;">
     <button data-answer='yes'>Yes</button>
     <button data-answer='no'>No</button>
     </div>
    `;
  deleteModal.addEventListener("click", (e) => {
    if (e.target.tagName == "BUTTON") {
      if (e.target.dataset.answer === "yes") {
        deleteFn();
      } else {
        modal.style.display = "none";
        deleteModal.remove();
      }
    }
  });
  return deleteModal;
};

export const createEditModal = () => {
  const editModal = document.createElement("div");
  editModal.classList.add("modal");
  editModal.style.width = "500px";
  editModal.innerHTML = `
   <h1>Edit Card</h1>
   <form class='editForm'>
          <input type="text" placeholder="Question:" name="question" />
          <input type="text" placeholder="Answer:" name="answer" />
          <select class="select edit-select" name="tag"></select>
     <div style="display:flex;justify-content:space-between;align-items:center;">
          <button type="submit">Edit</button>
          <button type='button' class='close'>Close</button>
          </div>
   </form>
  `;
  tags.forEach((tag) => {
    const option = document.createElement("option");
    option.value = tag.id;
    option.textContent = tag.name;
    editModal.querySelector(".edit-select").appendChild(option);
  });
  editModal.querySelector(".editForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = {
      question: formData.get("question"),
      answer: formData.get("answer"),
      tagId: formData.get("tag"),
    };
    console.log(body);
    customFetch(
      url("cards"),
      () => {
        createNotification("success", "Edited successfully.");
      },
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
  });
  editModal.querySelector(".close").addEventListener("click", () => {
    modal.style.display = "none";
    editModal.remove();
  });
  return editModal;
};
