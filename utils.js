export const url = (uri) => `http://78.40.109.168:7000/${uri}`;
export const createNotification = (type, message) => {
  const notification = document.createElement("div");
  notification.style.position = "fixed";
  notification.style.top = "20px";
  notification.style.left = "50%";
  notification.style.borderRadius = "20px";
  notification.style.color = "white";
  notification.style.translateX = '50%'
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
  fetch(url, params)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error");
      }
      return response.json();
    })
    .then((data) => {
      callback(data);
    })
    .catch((e) => createNotification("error", e.message));
};


