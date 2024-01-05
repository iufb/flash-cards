export const url = (uri) => `http://78.40.109.168:7000/${uri}`;
export const createNotification = (type, message) => {
  const notification = document.createElement("div");
  notification.style.position = "fixed";
  notification.style.top = "20px";
  notification.style.left = "50%";
  notification.style.borderRadius = "20px";
  notification.style.color = "white";
  notification.style.translateX = "50%";
  notification.style.padding = "10px 20px";
  if (type == "success") {
    notification.style.backgroundColor = "green";
  } else {
    notification.style.backgroundColor = "red";
  }
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 3000);
};

export const customFetch = (url, callback, params) => {
  const method = params.method ?? "GET";
  fetch(url, {
    method,
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
    body: params.body,
  })
    .then((response) => {
      if (response.status == 401) window.location = "./pages/login";
      if (!response.ok) {
        return response.text().then((text) => {
          // const error = JSON.parse(text)
          throw new Error(text)
        });
      }
      return response.json();
    })
    .then((data) => {
      callback(data);
    })

    .catch((e) => {
      const message = JSON.parse(e.message).message
     
      createNotification("error", message);
    });
};
