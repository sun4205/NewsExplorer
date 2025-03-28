import "./savedArticles.css";
import NewsCard from "../NewsCard/NewsCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SavedArticles({ savedArticles, handleRemoveArticle }) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  console.log("savedArticles:", savedArticles);
  
  return (
    <div className="savedArticles__container">
      <p className="savedArticles__title">Saved articles</p>
      <p className="savedArticles__numberSaved">
        {currentUser.username}, you have {savedArticles.length} saved articles
      </p>
      <p className="savedArticles__by">
        By keywords:{" "}
        <span className="savedArticles__keywords">
          {savedArticles.map((item) => item.keywords).join(", ")}
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
