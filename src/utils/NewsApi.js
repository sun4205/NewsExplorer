import { checkResponse } from "./api";

export const getNewsCards = (query) => {
  return fetch(
    `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`
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
