import { checkResponse } from "./api";

export const newsApiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

  //   export const newsApiBaseUrl =
  // process.env.NODE_ENV === "production"
  //   ? "https://nomorepart.co/news/v2/everything"
  //   : "https://news.org/v2/everything";

export const getNewsCards = (query) => {
  if(!query){
    console.error("query is empty");
    return Promise.reject(new Error("you must enter a search query"));
  }

  const API_KEY = import.meta.env.VITE_API_KEY;  
  return fetch(`${newsApiBaseUrl}?q=${query}&apiKey=${API_KEY}`).then(
    checkResponse
  );
};

export const filteredNewsData = (data) => {
  if (!data?.articles || !Array.isArray(data.articles) || data.articles.length === 0) {
    console.error(" No articles found");
    return [];
  }

  console.log('data',data);
  
  return data.articles.map((article)=>({
    source : article?.source?.name || "unknown source",
    title : article?.title || "no title",
    date : article?.publishedAt || " no date",
    description : article?.description || " no description",
    image : article?.urlToImage || "no image",
    _id: article.id

  }))
};
