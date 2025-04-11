// const baseUrl = "http://localhost:3000";
const baseUrl = import.meta.env.VITE_BASE_URL;

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error:${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function getSavedNews({ token }) {
  return request(`${baseUrl}/saveNews`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

function savedNews({ id, source, title, date, description, image, keywords }) {
  const token = localStorage.getItem("jwt");

  return request(`${baseUrl}/saveNews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id,
      source,
      title,
      date,
      description,
      image,
      keywords,
    }),
  });
}

const removeNewsCardSaved = (id, token) => {
  return request(`${baseUrl}/saveNews/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

function checkEmailAvailable(email) {
  return request(
    `${baseUrl}/users/check-email?email=${encodeURIComponent(email)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}

export {
  checkResponse,
  request,
  savedNews,
  removeNewsCardSaved,
  checkEmailAvailable,
  getSavedNews,
};
