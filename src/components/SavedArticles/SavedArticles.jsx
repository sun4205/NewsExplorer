import "./savedArticles.css";
import NewsCard from "../NewsCard/NewsCard";
import React, { useEffect, useState, useContext} from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";




function SavedArticles({
  savedArticles,
  handleRemoveArticle,
 setSavedArticles,
 fetchKeywords,
 keywords,
}) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  
 
  console.log("savedArticles:", savedArticles);
  console.log("Keywords:", keywords);


const allKeywords = savedArticles
  .map((item) => item.keywords)      
  .flat()                            
  .filter(Boolean);                   


const uniqueKeywords = [...new Set(allKeywords)];

console.log("All Unique Keywords:", uniqueKeywords);


const keywordsText =
  uniqueKeywords.length > 2
    ? `${uniqueKeywords.slice(0, 2).join(", ")} and ${uniqueKeywords.length - 2} others`
    : uniqueKeywords.join(", ");

console.log("keywordsText:", keywordsText);

  
  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="savedArticles__container">
      <p className="savedArticles__title">Saved articles</p>
      <p className="savedArticles__numberSaved">
        {currentUser.username}, you have {savedArticles.length} saved articles
      </p>
      <p className="savedArticles__by">
        By keywords:{" "}
        <span className="savedArticles__keywords">
        {keywordsText}
        </span>
      </p>

      <ul className="savedArticles__lists">
        {savedArticles.map((item, index) => (
          <NewsCard
            key={index}
            data={item}
            handleNewsSaved={() => handleNewsSaved({ data: item })}
            handleRemoveArticle={handleRemoveArticle}
          />
        ))}
      </ul>
    </div>
  );
}
export default SavedArticles;
