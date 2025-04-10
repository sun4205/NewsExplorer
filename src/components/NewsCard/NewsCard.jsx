import "./NewsCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import SavedArticlesContext from "../../contexts/SavedArticlesContext";
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";

function NewsCard({ data, handleNewsSaved, handleRemoveArticle }) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { savedArticles, setSavedArticles } = useContext(SavedArticlesContext);
  const [isSaved, setIsSaved] = useState(false);
  const location = useLocation();

  const handleSaveClick = () => {
    if (!data) {
      console.error("data is null or undefined");
      return;
    }

    if (!isSaved) {
      setSavedArticles((prevSavedArticles) => {
        const updatedArticles = [...prevSavedArticles, data];
        console.log("savedupdatedarticles:", updatedArticles);
        return updatedArticles;
      });
      handleNewsSaved(data);
      setIsSaved(true);
    } else {
      setSavedArticles((prevSavedArticles) => {
        const updatedArticles = prevSavedArticles.filter(
          (article) => article && article.id !== data.id
        );
        console.log("updated:", updatedArticles);
        return updatedArticles;
      });

      setIsSaved(false);
    }
  };

  return (
    <li className="card">
      <div className="card__image-control">
        <img className="card__image" src={data?.image} alt={data?.title} />

        <div className="card__button-overlay">
          {currentUser ? (
            location.pathname === "/saveNews" ? (
              <div className="card__delete-keyword-container">
                <button
                  onClick={() => handleRemoveArticle(data.id)}
                  className="card__save-btn card__save-btn-delete"
                ></button>
                <span className="card__image__remove">Remove from saved</span>
                <div className="card__image__keywords">
                  <span className="card__image__keyword">{data?.keywords}</span>
                </div>
              </div>
            ) : (
              <button
                onClick={handleSaveClick}
                className={`card__save-btn ${
                  isSaved ? "card__save-btn--saved" : "card__save-btn--default"
                }`}
              ></button>
            )
          ) : (
            <div className="card__sign-in-container">
              <button className="card__save-btn card__save-btn--default"></button>
              <button className="card__save-btn card__save-btn--signin">
                <span className="card__sign-in-text">
                  Sign in to save articles
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="card__info">
        <p className="card__date">
          {location.pathname === "/saveNews" ? data?.date : data?.date}
        </p>
        <p className="card__title">{data?.title}</p>
        <p className="card__description">{data?.description}</p>
        <p className="card__source">{data?.source?.name}</p>
      </div>
    </li>
  );
}

export default NewsCard;
