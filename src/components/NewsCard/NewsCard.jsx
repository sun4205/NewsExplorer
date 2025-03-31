import "./NewsCard.css";
import savebtn from "../../images/savebtn.svg";
import nature from "../../images/nature.svg";
import savedBlue from "../../images/saved-btn-blue.svg";
import deletebtn from "../../images/saved-btn-delete.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import SavedArticlesContext from "../../contexts/SavedArticlesContext";
import { useContext, useState,useEffect } from "react";
import { useLocation } from "react-router-dom";

function NewsCard({ data, handleNewsSaved, handleRemoveArticle }) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { savedArticles, setSavedArticles } = useContext(SavedArticlesContext);
  const [isSaved, setIsSaved] = useState(false);
  const location = useLocation();

  // useEffect(() => {
  //   console.log("savedArticles:", savedArticles);  
  //   console.log("data:", data);                 
  //   if ( savedArticles.some((article) => article.id === data.id)) {
  //     setIsSaved(true);
  //   } else {
  //     setIsSaved(false);
  //   }
  // }, [savedArticles, data.id]);

  console.log("Received data:", data);

  const handleSaveClick = () => {
    console.log("saveddata", data);
    console.log("dataid", data.id);
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
          (article) => article.id !== data.id
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
        <img className="card__image" src={data?.urlToImage} alt={data?.title} />
        {currentUser ? (
          location.pathname === "/savedNews" ? (
            <button
              onClick={() => handleRemoveArticle(data.id)}
              className="card__save-btn card__save-btn-delete"
            ></button>
          ) : (
            <button
              onClick={handleSaveClick}
              className={`card__save-btn ${
                isSaved ? "card__save-btn--saved" : "card__save-btn--default"
              }`}
            ></button>
          )
        ) : (
          <button className="card__save-btn card__save-btn--signin">
            <span className="card__sign-in-text">Sign in to save articles</span>
          </button>
        )}
      </div>

      <div className="card__info">
        <p className="card__date">{data?.publishedAt}</p>
        <p className="card__title">{data?.title}</p>
        <p className="card__description">{data?.description}</p>
        <p className="card__source">{data?.source?.name}</p>
      </div>
    </li>
  );
}

export default NewsCard;
