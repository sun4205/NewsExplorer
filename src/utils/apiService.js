import { getCachedData, setCachedData } from './cacheHelper';

export const fetchData = async (query) => {
  const cacheKey = `api-data-${query}`;
  const cachedData = getCachedData(cacheKey);

  if (cachedData) return cachedData;

  const response = await fetch(`https://api.example.com/data?query=${query}`);
  const data = await response.json();
  setCachedData(cacheKey, data, 5 * 60 * 1000); // Cache for 5 minutes
  
  return data;
};