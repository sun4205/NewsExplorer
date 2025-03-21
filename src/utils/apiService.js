import { getCachedData, setCachedData } from './cacheHelper';
import { newsApiBaseUrl } from './NewsApi'; 

export const fetchData = async (query) => {
  const cacheKey = `api-data-${query}`;
  const cachedData = getCachedData(cacheKey);

  if (cachedData) return cachedData;

  const API_KEY = import.meta.env.VITE_API_KEY;
  const response = await fetch(`${newsApiBaseUrl}?q=${query}&apiKey=${API_KEY}`);
  
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const data = await response.json();
  setCachedData(cacheKey, data, 5 * 60 * 1000); 
  
  return data;
};