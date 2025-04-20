import "./Main.css";
import notFound from "../../images/not_found.svg";
import NewsCard from "../NewsCard/NewsCard";
import ShowMore from "../ShowMore/ShowMore";
import About from "../About/About";
import Preloader from "../Preloader/Preloader";
import { useState } from "react";

function Main({
  isLoading,
  newsItems,
  handleNewsSaved,
  handleRemoveArticle,
  isSearched,
  query,
}) {
  const [renderedCards, setRenderedCards] = useState(3);

  const handleShowMore = () => {
    setRenderedCards((prev) => Math.min(prev + 3, 9));
  };

  return (
    <div className="main">
      {query && (
        <section className="main__cards-section">
          <h2 className="main__title">Search results</h2>
          {isLoading ? (
            <Preloader />
          ) : (
            <ul
              className={`main__cards-list ${
                newsItems?.length > 0
                  ? "main__cards-list--row"
                  : "main__cards-list--column"
              }`}
            >
              {!isSearched || isLoading ? null : newsItems?.length > 0 ? (
                newsItems
                  .slice(0, renderedCards)
                  .map((item) => (
                    <NewsCard
                      key={item.id}
                      data={item}
                      handleNewsSaved={() => handleNewsSaved({ data: item })}
                      handleRemoveArticle={handleRemoveArticle}
                    />
                  ))
              ) : (
                <div className="main__not-found">
                  <img src={notFound} alt="Not found" />
                  <p className="main__not-found-text">Nothing found</p>
                  <p className="main__not-found-description">
                    Sorry, but nothing matched your search terms
                  </p>
                </div>
              )}
            </ul>
          )}
          {renderedCards < 9 && renderedCards < newsItems?.length && (
            <ShowMore onClick={handleShowMore} />
          )}
        </section>
      )}

      <About />
    </div>
  );
}

export default Main;
