const baseUrl = "http://localhost:3000";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error:${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function savedNews({ articleId, source, title, date, description, image, keywords  }) {
  console.log("Sending fetch request...");
  console.log("ID being sent:", articleId); 
  console.log("Data being sent:", {
    id: articleId,  
    source,
    title,
    date,
    description,
    image,
    keywords,
  });

  const token = localStorage.getItem("jwt");

  return fetch(`${baseUrl}/saveNews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: articleId,  
      source: source?.name,  
      title,
      date,
      description,
      image,
      keywords,
    }),
  }) 
    .then((res) => {
      console.log("Response status:", res.status);
      return res.json();
    })
    .then((data) => {
      console.log("Server response:", data);
      return data; 
    })
    .catch((error) => {
      console.error("Error saving news:", error);
    });
}

const removeNewsCardSved = (articleId, token) => {
  
  return fetch(`${baseUrl}/saveNews/${articleId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
  .then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  });
};

export { checkResponse, savedNews, removeNewsCardSved };
