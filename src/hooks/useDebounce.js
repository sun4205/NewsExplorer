import { useEffect, useState } from "react";

  function useDebounce (value,delay=500) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      console.log("inside debounce effect:", value);
        const timerID = setTimeout(() => {
          console.log("debounce set:", value);
          setDebouncedValue(value);
        }, delay);
    
        return () => {
          clearTimeout(timerID); 
        };
      }, [value, delay]);
    return debouncedValue;
}

export default useDebounce;