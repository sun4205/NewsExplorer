const baseUrl = "http://localhost:3000";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error:${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function savedNews({ source, title, date, description, image }) {
  const articleId = crypto.randomUUID();
  console.log("Card ID:", articleId);
  console.log(" Sending fetch request...");
  const token = localStorage.getItem("jwt");
  return fetch(`${baseUrl}/saveNews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      source,
      title,
      date,
      description,
      image,
    }),
  });
}

const removeNewsCardSved = (id, token) => {
  return fetch(`${baseUrl}/saveNews/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export {
  checkResponse,
  savedNews, 
  removeNewsCardSved,
};
