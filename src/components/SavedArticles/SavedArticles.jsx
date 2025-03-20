import "./savedArticles.css";
import NewsCard from "../NewsCard/NewsCard";

function SavedArticles({ savedArticles }) {
  console.log("savedArticles:", savedArticles);
  //   return(
  //     //   <div className='savedArticles__container'>
  //     //       <p className='savedArticles__title'>Saved articles</p>
  //     //       <p className='savedArticles__numberSaved'>{savedArticles.username}, you have {savedArticles.length} saved articles</p>
  //     //       <p className='savedArticles__by'>By keywords: <span className='savedArticles__kewords'> {savedArticles.map(article => article.keywords).join(", ")}</span></p>

  //     //       <ul className='savedArticles__lists'>
  //     //       {savedArticles.map((article, index) => (
  //     //     <NewsCard
  //     //       key={index}
  //     //       image={article.image}
  //     //       date={article.date}
  //     //       title={article.title}
  //     //       description={article.description}
  //     //       source={article.source}
  //     //       saveBtnImage={article.saveBtnImage}
  //     //     />
  //     //   ))}
  //     //       </ul>
  //     //   </div>
  //   )
  return (
    <div className="savedArticles__wrapper">
    <div className="savedArticles__container">
      <p className="savedArticles__title">Saved articles</p>
      <p className="savedArticles__numberSaved">
        Hanna, you have 5 saved articles
      </p>
      <p className="savedArticles__by">
        By keywords:
        <span className="savedArticles__kewords">nature,yellowstone</span>
      </p>
      </div>

      <div className="savedAricles__listContainer">
        <ul className="savedArticles__lists">
          <NewsCard />
          <NewsCard />
          <NewsCard />
          <NewsCard />
          <NewsCard />
          <NewsCard />
        </ul>
      </div>
      </div>
   
  );
}
export default SavedArticles;
