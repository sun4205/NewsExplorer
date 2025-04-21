import "./savedArticles.css";
import NewsCard from "../NewsCard/NewsCard";
import React, { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SavedArticles({ savedArticles, handleRemoveArticle }) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const allKeywords = savedArticles
    .map((item) => item.keywords)
    .flat()
    .filter(Boolean);

  const uniqueKeywords = [...new Set(allKeywords)];

  console.log("All Unique Keywords:", uniqueKeywords);

  const keywordsText =
    uniqueKeywords.length > 2
      ? `${uniqueKeywords.slice(0, 2).join(", ")} and ${
          uniqueKeywords.length - 2
        } others`
      : uniqueKeywords.join(", ");

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="saved-articles">
      <div className="saved-articles__info">
        <p className="saved-articles__title">Saved articles</p>
        <p className="saved-articles__count">
          {currentUser.username}, you have {savedArticles.length} saved articles
        </p>
        <p className="saved-articles__keywords-label">
          By keywords:{" "}
          <span className="saved-articles__keywords">{keywordsText}</span>
        </p>
      </div>
      <div className="saved-articles__list-wrapper">
        <ul className="saved-articles__list">
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
    </div>
  );
}
export default SavedArticles;
