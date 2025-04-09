import "./SearchForm.css";
import { useState, useEffect } from "react";
import { getNewsCards } from "../../utils/NewsApi";
import useDebounce  from "../../hooks/useDebounce";

function SearchForm({ handleSearchSubmit, query, setQuery }) {
  const debouncedQuery = useDebounce(query, 500);
  console.log("querytype:", query);
  console.log("debouncedQuery:", debouncedQuery); 
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    if (debouncedQuery.trim().length < 3) return;
    console.log("debouncedQuery triggered:", debouncedQuery);
    handleSearchSubmit({ query: debouncedQuery });
  }, [debouncedQuery, handleSearchSubmit]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (query.trim() === "") return;
  //   handleSearchSubmit({ query });
  // };
  // 
  return (
    // <div className="searchForm__container">
    //   <h1 className="searchForm__title">What's going on in the world?</h1>
    //   <p className="searchForm__description">
    //     Find the latest news on any topic and save them in your personal
    //     account.
    //   </p>
    //   <div className="searchForm__controls">
    //     <label className="searchForm__label">
    //       <input
    //         className="searchForm__input"
    //         type="search"
    //         id="search__input"
    //         name="search__input"
    //         placeholder="Enter Topic"
    //         value={query}
    //         onChange={handleInputChange}
    //       ></input>
    //     </label>
    //     <button
    //       type="button"
    //       onClick={handleSubmit}
    //       className="searchForm__btn"
    //     >
    //       Search
    //     </button>
    //   </div>
    // </div>
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
