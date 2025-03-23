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
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  console.log("Received data:", data);

  const isSaved =
    currentUser && Array.isArray(data.saved)
      ? data.saved.includes(currentUser._id)
      : false;

  const handleNewsClick = () => {
    console.log("News ID:", data._id);
    handleNewsSaved({ id: data._id, saved: data.saved });
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
            <img
              src={isSaved ? savedBlue : savebtn}
              className="card__savebtn-img"
              alt="save button"
            />
          </button>
        ) : (
          <button className="card__save-btn">
            <img
              src={savebtn}
              className="card__savebtn-img"
              alt="save button"
            />
          </button>
        )}
      </div>
      <div className="card__info">
        <p className="card__date">{currentDate}</p>
        <p className="card__title">{data.title}</p>
        <p className="card__description">{data.description}</p>
        <p className="card__source">{data.source.name}</p>
      </div>
    </li>
  );
}

export default NewsCard;
