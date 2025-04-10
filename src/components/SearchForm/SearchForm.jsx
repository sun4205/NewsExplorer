import "./SearchForm.css";
import { useEffect } from "react";

function SearchForm({ debouncedFetch, query, setQuery }) {
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length >= 3) {
      debouncedFetch(value);
    }
  };
  useEffect(() => {
    return () => {
      debouncedFetch.cancel();
    };
  }, [debouncedFetch]);

  return (
    <div className="searchForm__container">
      <h1 className="searchForm__title">What's going on in the world?</h1>
      <p className="searchForm__description">
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <div className="searchForm__controls">
        <label className="searchForm__label">
          <input
            className="searchForm__input"
            type="search"
            id="search__input"
            name="search__input"
            placeholder="Enter Topic"
            value={query}
            onChange={handleInputChange}
          ></input>
        </label>
        <button
          type="button"
          onClick={() => handleSearchSubmit({ query })}
          className="searchForm__btn"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchForm;
