import SearchForm from "../SearchForm/SearchForm";
import { useDebounce } from "../../utils/useDebounce";
import { fetchData } from "../../utils/apiService";

const SearchComponent = ({ query, setQuery }) => {
  const debouncedFetchData = useDebounce((q) => fetchData(q), 500);

  const handleSearchSubmit = (searchQuery) => {
    debouncedFetchData(searchQuery);
  };

  return (
    <SearchForm
      query={query}
      setQuery={setQuery}
      handleSearchSubmit={handleSearchSubmit}
    />
  );
};

export default SearchComponent;
