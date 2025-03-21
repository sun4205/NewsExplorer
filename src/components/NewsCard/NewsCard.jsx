import "./NewsCard.css";
import savebtn from "../../images/savebtn.svg";
import nature from "../../images/nature.svg";

function NewsCard({ data }) {
  if (!data) {
    console.log("undefined data!");
    return null;
  }
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  console.log("Received data:", data);
  return (
    <li className="card">
      <div className="card__image-control">
        <img className="card__image" src={data?.urlToImage} alt={data?.title} />
        <button className="card__save-btn">
          <img src={savebtn} className="card__savebtn-img"></img>
        </button>
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
