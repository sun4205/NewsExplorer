export const getCachedData = (key) => {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
  
    const { data, expiry } = JSON.parse(cached);
    if (Date.now() > expiry) {
      localStorage.removeItem(key);
      return null;
    }
  
    return data;
  };
  
  export const setCachedData = (key, data, ttl) => {
    localStorage.setItem(key, JSON.stringify({ data, expiry: Date.now() + ttl }));
  };