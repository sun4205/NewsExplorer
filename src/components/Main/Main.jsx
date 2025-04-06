import "./Main.css";
import notFound from '../../images/not_found.svg';
import NewsCard from "../NewsCard/NewsCard";
import ShowMore from "../ShowMore/ShowMore";
import Preloader from "../Preloader/Preloader";
import { useState } from "react";

function Main({ isLoading, newsItems, handleNewsSaved, handleRemoveArticle,urlQuery }) {
  const [renderedCards, setRenderedCards] = useState(3);

  // console.log("newsItems in Main:", newsItems);
  // console.log("mainurlQuery:", urlQuery);

  const handleShowMore = () => {
    setRenderedCards((prev) => Math.min(prev + 3, 9));
  };


  return (
    <main className="main">
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <h2 className="main__title">Search results</h2>
      <section className="main__cards">
        <ul className={`main__cards-list ${newsItems.length > 0 ? "main__cards-list--row" : "main__cards-list--column"}`}>
          {newsItems.length > 0 ? (
            newsItems.slice(0, renderedCards).map((item) => (
              <NewsCard
                key={item.id}
                data={item}
                handleNewsSaved={() => handleNewsSaved({ data: item })}
                handleRemoveArticle={handleRemoveArticle}
               
              />
            ))
          )  : (<div className="main__notFound-container">
                <img src={notFound} alt=""></img>
                <p className="main__notFound">Nothing found</p>
                <p className="main__sorry">Sorry,but nothing matched your search terms</p>
                </div>
              )}
            </ul>
            {renderedCards < 9 && renderedCards < newsItems.length && (
              <ShowMore onClick={handleShowMore} />
            )}
          </section>
        </>
      )}
    </main>
  );
}

export default Main;
