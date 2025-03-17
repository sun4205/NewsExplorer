import { useState, useCallback } from 'react';

export const useDebounce = (callback, delay) => {
  const [timeoutId, setTimeoutId] = useState(null);

  return useCallback((...args) => {
    if (timeoutId) clearTimeout(timeoutId);

    const newTimeoutId = setTimeout(() => {
      callback(...args);
    }, delay);

    setTimeoutId(newTimeoutId);
  }, [callback, delay, timeoutId]);
};