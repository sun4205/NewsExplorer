
const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error:${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function savedNews({ source, title, date, description, image }) {
  const token = localStorage.getItem("jwt");
  return request(`${baseUrl}/saveNews`, {
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
  return request(`${baseUrl}/saveNews/${_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

};
function generateUniqueId(data) {
  console.log("Full Article:", data)
  const title = data?.source?.name || "no-title";
  const date = data?.publishedAt ? new Date(data.publishedAt).toISOString() : "no-date"; 
  return encodeURIComponent(`${title}-${date}`);
}

const addNewsCardSaved = (data, token) => {
  console.log("Article object:", data);
  console.log("Article Title:", data.title);
  console.log("Article Date:", data.publishedAt); 
  const articleId = data.id || generateUniqueId(data);
  console.log("Card ID:", articleId); 
 
  return fetch(`${baseUrl}/saveNews/${articleId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: articleId, publishedAt: data.publishedAt }),
  })
  .then((res) => {
    if (!res.ok) {
      throw new Error("Failed to save the article");
    }
    return res.json();
  })
  .catch((err) => {
    console.error("Error saving article:", err);  
    throw err;  
  });
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
