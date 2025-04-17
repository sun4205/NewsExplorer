import "./SearchForm.css";
import { useEffect } from "react";

function SearchForm({ debouncedFetch, query, setQuery }) {
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleSearchSubmit = ({ query }) => {
    debouncedFetch(query);
  };

  useEffect(() => {
    return () => {
      debouncedFetch.cancel();
    };
  }, [debouncedFetch]);

  return (
    <form className="search-form">
    <div className="search-form__container">
      <h1 className="search-form__title">What's going on in the world?</h1>
      <p className="search-form__description">
        Find the latest news on any topic and save them in your personal
        account.
      </p>
      <div className="search-form__controls">
        <label className="search-form__label">
          <input
            className="search-form__input"
            type="search"
            id="search-input"
            name="search-input"
            placeholder="Enter Topic"
            value={query}
            onChange={handleInputChange}
          ></input>
        </label>
        <button
          type="button"
          onClick={() => handleSearchSubmit({ query })}
          className="search-form__button"
        >
          Search
        </button>
      </div>
    </div>
    </form>
  );
}

export default SearchForm;
