const newsApiBaseUrl = "https://newsapi.org/v2/everything";
const backendBaseUrl = "http://localhost:3001";
const API_KEY = "MY_API_KEY";

function checkResponse(res) {
    return res.ok? res.json() : Promise.reject(`Error:${res.status}`);    
}

function request(url,options){
 return fetch(url,options).then(checkResponse);
}

function getNewsCards(query) {
    return request(`${newsApiBaseUrl}?q=${query}&apiKey=${API_KEY}`);
}

function savedNews({source, title, date, description, image}) {
    return request(`${backendBaseUrl}/savedNews`,{
        method:"POST",
        headers: {
            "Content-Type":"application/json",
            authorization:`Bearer ${localStorage.getItem("jwt")}`
        },
        body:JSON.stringify({
            source,
            title,
            date,
            description,
            image,
        }),
    });
};


const deleteNewsCard = (_id) => {
    const token = localStorage.getItem("jwt");
    console.log("Deleting NewsCard with _id:", _id);
    return request(`${backendBaseUrl}/savedNews/${_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  };
    
  
  const NewsCardSaved = (id, token) => {
    console.log("Card ID:", id);
    return fetch(`${backendBaseUrl}/saveNews/${id}/saved`, {
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
    return fetch(`${backendBaseUrl}/saveNews/${id}`, {
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
    getNewsCards,
    savedNews,
    deleteNewsCard,
    NewsCardSaved,
    removeNewsCardSved
  };
  