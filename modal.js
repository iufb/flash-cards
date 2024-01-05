import { customFetch, url } from "./utils.js";

const modal = document.querySelector(".modal");

export const openModal = (children, callback) => {
  modal.style.display = "flex";
  if (children) {
    modal.appendChild(children);
  }
  callback();
};

export const createDeleteModal = (deleteFn) => {
  const deleteModal = document.createElement("div");
  deleteModal.classList.add("deleteModal");
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

}