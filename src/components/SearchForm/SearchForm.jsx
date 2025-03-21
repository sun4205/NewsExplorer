import { useEffect, useState } from "react";
import "./SearchForm.css";


function SearchForm({ handleSearchSubmit,query,setQuery }) {
 

 
    const handleInputChange = (e) => {
        setQuery(e.target.value);
        console.log("setquery:", e.target.value); 
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      if (query.trim() === "") return; 
      handleSearchSubmit({query});
    };
  

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
            type="text"
            id="search__input"
            name="search__input"
            placeholder="Enter Topic"
            value={query}
            onChange = {handleInputChange}
          ></input>
        </label>
        <button type="button" onClick={handleSubmit} className="searchForm__btn"></button>
      </div>
    </div>
  );
}

export default SearchForm;
