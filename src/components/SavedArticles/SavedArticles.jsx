import "./savedArticles.css";
import NewsCard from "../NewsCard/NewsCard";
import { useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";


function SavedArticles({
  savedArticles,
  handleRemoveArticle,
 setSavedArticles
}) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
 
  console.log("savedArticles:", savedArticles);

  
  const allKeywords = [...new Set( (savedArticles || []) 
  .filter(item => item && item.keywords) 
  .flatMap(item => item.keywords)
)];

const keywordsText = allKeywords.length > 2  
  ? `${allKeywords.slice(0, 2).join(", ")} and ${allKeywords.length - 2} others`  
  : allKeywords.join(", ");  


  
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
