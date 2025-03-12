
const baseUrl = "http://localhost:3001";


function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error:${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function savedNews({ source, title, date, description, image }) {
  const token = localStorage.getItem("jwt");
  return request(`${baseUrl}/savedNews`, {
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

const deleteNewsCard = (_id) => {
  console.log("Deleting NewsCard with _id:", _id);
  return request(`${baseUrl}/savedNews/${_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

const addNewsCardSaved = (id, token) => {
  console.log("Card ID:", id);
  return fetch(`${baseUrl}/saveNews/${id}/saved`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

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
  deleteNewsCard,
  addNewsCardSaved,
  removeNewsCardSved,
};
