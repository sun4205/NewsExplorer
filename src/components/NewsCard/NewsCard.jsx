import "./NewsCard.css";
import savebtn from "../../images/savebtn.svg";
import nature from"../../images/nature.svg";


function NewsCard({data}) {
  if (!data) {
    console.warn("NewsCard received undefined data!");
    return null; 
  }
   const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
   });
   console.log("Received data in NewsCard:", data);
  return (
     <li className="card">
       <img className="card__image" src={data?.image} alt={data?.title} />
      <button className="card__save-btn"></button>
      <div className="card__info">
      <p className="card__date">{currentDate}</p>
       <p className="card__title">{data.title}</p>
     <p className="card__description">{data.description}</p>
      <p className="card__source">{data.source}</p>
      </div>
    </li>
    // <li className="card">
    //   <div className="card__image-control">
    //   <img className="card__image" src={nature} alt="nature" />
    //   <button className="card__save-btn"><img src={savebtn}className="card__savebtn-img"></img></button>
    //   </div>
    //   <div className="card__info">
    //   <p className="card__date">November 4, 2020</p>
    //   <p className="card__title">Everyone Needs a Special 'Sit Spot' in Nature</p>
    //   <p className="card__description">Ever since I read Richard Louv's influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find...</p>
    //   <p className="card__source">treehugger</p>
    //   </div>
    // </li>
    
    
  );
}

export default NewsCard;
