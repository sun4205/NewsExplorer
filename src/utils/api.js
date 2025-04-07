const baseUrl = "http://localhost:3000";

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
  console.log("Sending fetch request...");
  console.log("ID being sent:", id);
  console.log("Data being sent:", {
    id,
    source,
    title,
    date,
    description,
    image,
    keywords,
  });

  const token = localStorage.getItem("jwt");
  console.log("token:", token);

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
  savedNews,
  removeNewsCardSaved,
  checkEmailAvailable,
  getSavedNews,
};
