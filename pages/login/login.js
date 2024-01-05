import { customFetch, url, createNotification } from "../../utils.js";
const form = document.querySelector("form");
if(window.localStorage.getItem('token')){
 window.location = '../../index.html'
}
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formdata = new FormData(form);
  customFetch(
    url("auth/login"),
    (data) => {
      console.log(data);
      window.localStorage.setItem('token', data.access_token)
      window.localStorage.setItem('userId', data.id)
      createNotification("success", "Logged");
       window.location = "../../index.html";
    },
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formdata.get("username"),
        password: formdata.get("password"),
      }),
    }
  );
});
