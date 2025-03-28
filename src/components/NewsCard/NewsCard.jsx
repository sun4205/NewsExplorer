import "./NewsCard.css";
import savebtn from "../../images/savebtn.svg";
import nature from "../../images/nature.svg";
import savedBlue from "../../images/saved-btn-blue.svg";
import deletebtn from "../../images/saved-btn-delete.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import { useLocation } from "react-router-dom";

function NewsCard({ data, handleNewsSaved, handleRemoveArticle }) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const location = useLocation();

  if (!data) {
    console.log("undefined data!");
    return null;
  }

  console.log("Received data:", data);
  const saved = currentUser?.saved || [];
  const articleId = crypto.randomUUID();
  const isSaved = saved.includes(articleId);

  const handleSaveClick = () => {
    handleNewsSaved({ data });
  };

  return (
    <li className="card">
      <div className="card__image-control">
        <img className="card__image" src={data?.urlToImage} alt={data?.title} />
        {currentUser ? (
          location.pathname === "/savedNews" ? (
            <button
              onClick={() => handleRemoveArticle(data)}
              className="card__save-btn"
            >
              <img
                src={deletebtn}
                className="card__savebtn-img"
                alt="delete button"
              />
            </button>
          ) : (
            <button onClick={handleSaveClick} className="card__save-btn">
              <img
                src={isSaved ? savedBlue : savebtn}
                className="card__savebtn-img"
                alt="save button"
              />
            </button>
          )
        ) : (
          <button className="card__save-btn">
            <div className="card__save-btn-content">
              <img
                src={savebtn}
                className="card__savebtn-img"
                alt="save button"
              />
              <span className="card__sign-in-text">
                Sign in to save articles
              </span>
            </div>
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
