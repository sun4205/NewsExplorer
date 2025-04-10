import "./ShowMore.css";

function ShowMore({ onClick }) {
  return (
    <div className="showmore_container">
      <button className="showmore__btn" onClick={onClick}>
        showmore
      </button>
    </div>
  );
}

export default ShowMore;
