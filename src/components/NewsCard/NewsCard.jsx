import "./NewsCard.css";

function NewsCard(data) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <li className="card">
      <img className="card__image" src={data.image} alt={data.image} />
      <button className="card__save-btn"></button>
      <div className="card__info">
      <p className="card__date">{currentDate}</p>
      <p className="card__title">{data.title}</p>
      <p className="card__description">{data.description}</p>
      <p className="card__source">{data.source}</p>
      </div>
    </li>
  );
}

export default NewsCard;
