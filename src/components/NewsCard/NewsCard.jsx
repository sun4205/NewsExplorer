import "./NewsCard.css";
import savebtn from "../../images/savebtn.svg";
import nature from "../../images/nature.svg";
import savedBlue from "../../images/saved-btn-blue.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function NewsCard({ data, handleNewsSaved }) {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  if (!data) {
    console.log("undefined data!");
    return null;
  }
  
  console.log("Received data:", data);

  const articleId = data._id || encodeURIComponent(data.url);

  const isSaved =
    currentUser && Array.isArray(data.saved)
      ? data.saved.includes(currentUser._id)
      : false;

  const handleNewsClick = () => {
    console.log(" handleNewsClick clicked"); 
    console.log("News ID:", articleId);   
    handleNewsSaved({ data});
  };
  return (
    <li className="card">
      <div className="card__image-control">
        <img className="card__image" src={data?.urlToImage} alt={data?.title} />
        {currentUser ? (
          <button
            onClick={handleNewsClick}
            className={`card__save-btn ${isSaved ? "saved" : ""}`}
          >
          <div className="card__save-btn-content">
            <img
              src={isSaved ? savedBlue : savebtn}
              className="card__savebtn-img"
              alt="save button"
            />
              {!currentUser && (
      <span className="card__sign-in-text">Sign in to save articles</span>
    )}
             </div>
          </button>
        ) : (
          <button className="card__save-btn">
            <div className="card__save-btn-content">
            <img
              src={savebtn}
              className="card__savebtn-img"
              alt="save button"
            />
            <span className="card__sign-in-text">Sign in to save articles</span>
            </div>
          </button>
        )}
      </div>
      <div className="card__info">
        <p className="card__date">{data.publishedAt}</p>
        <p className="card__title">{data.title}</p>
        <p className="card__description">{data.description}</p>
        <p className="card__source">{data.source.name}</p>
      </div>
    </li>
  );
}

export default NewsCard;
