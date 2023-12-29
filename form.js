import { form } from "./main.js";
import { customFetch, createNotification, url } from "./utils.js";
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const body = {
    question: formData.get("question"),
    answer: formData.get("answer"),
    tagId: formData.get("tag"),
  };

  customFetch(
    url("cards"),
    () => {
      createNotification("success", "Created successfully.");
    },
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
});
