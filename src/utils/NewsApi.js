import { checkResponse } from "./api";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

// export const newsApiBaseUrl =
//   process.env.NODE_ENV === "production"
//     ? "https://nomoreparties.co/news/v2/everything"
//     : "https://newsapi.org/v2/everything";
export const newsApiBaseUrl = import.meta.env.VITE_BASE_URL;

function processNewsData(articles, query) {
  return articles.map((article) => {
    const rawDate = article?.publishedAt || null;

    let formattedDate = "no date";
    if (rawDate) {
      const publishedDate = new Date(rawDate);
      if (!isNaN(publishedDate.getTime())) {
        formattedDate = format(publishedDate, "MMMM dd, yyyy");
      } else {
        console.error("Invalid date format:", rawDate);
      }
    }
    return {
      id: uuidv4(),
      source: article?.source || "unknown source",
      title: article?.title || "no title",
      date: formattedDate,
      description: article?.description || "no description",
      image: article?.urlToImage || "no image",
      keywords: [query],
    };
  });
}

export const getNewsCards = (query) => {
  if (!query) {
    return Promise.reject(new Error("You must enter a search query"));
  }

  const API_KEY = import.meta.env.VITE_API_KEY;

  return fetch(`${newsApiBaseUrl}?q=${query}&apiKey=${API_KEY}`)
    .then(checkResponse)
    .then((data) => {
      if (data.articles) {
        const processedData = processNewsData(data.articles, query);
        console.log("Processed news data:", processedData);
        return processedData;
      }
      return [];
    })
    .catch((err) => console.error(err));
};
