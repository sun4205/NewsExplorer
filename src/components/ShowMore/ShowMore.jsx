import "./ShowMore.css";

function ShowMore({ onClick }) {
  return (
    <div className="show-more">
      <button className="show-more__btn" onClick={onClick}>
        showmore
      </button>
    </div>
  );
}

export default ShowMore;
