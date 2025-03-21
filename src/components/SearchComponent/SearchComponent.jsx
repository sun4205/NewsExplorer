import SearchForm from "../SearchForm/SearchForm";
import { useDebounce } from "../../utils/useDebounce";
import { fetchData } from "../../utils/apiService";

const SearchComponent = ({ query, setQuery, handleSearchSubmit}) => {
  const debouncedFetchData = useDebounce((q) => fetchData(q), 500);

  const handleSearchSubmitLocal = (searchQuery) => {
    debouncedFetchData(searchQuery);
    handleSearchSubmit({ query: searchQuery });
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
