import { checkResponse } from "./api";

export const newsApiBaseUrl = process.env.NODE_ENV === "production" 
  ? "https://nomoreparties.co/news/v2/everything"
  : "https://newsapi.org/v2/everything";

export const getNewsCards = (query) => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  return fetch(
    `${newsApiBaseUrl}?q=${query}&apiKey=${process.env.REACT_APP_API_KEY}`
  ).then(checkResponse);
};

export const filteredNewsData = (data) => {
  const result = {};
  result.source = data.source.name;
  result.title = data.title;
  result.date = data.publishedAt;
  result.description = data.description;
  result.image = data.urlToImage;
  console.log(result);
  return result;
};
