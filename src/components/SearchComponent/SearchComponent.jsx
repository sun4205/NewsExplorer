import { useState } from 'react';
import { useDebounce } from '../../utils/useDebounce';
import { fetchData } from '../../utils/apiService';

const SearchComponent = () => {
  const [query, setQuery] = useState('');
  const debouncedFetchData = useDebounce((q) => fetchData(q), 500);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
    debouncedFetchData(event.target.value);
  };

  return <input type="text" value={query} onChange={handleInputChange} />;
};

export default SearchComponent;