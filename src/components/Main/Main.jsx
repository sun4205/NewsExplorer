import "./Main.css";
import NewsCard from "../NewsCard/NewsCard";
import About from "../About/About";
import ShowMore from "../ShowMore/ShowMore";
import { useState } from "react";

function Main({ newsData, newsItems, handleNewsSaved }) {
  const [renderedCards, setRenderedCards] = useState(3);
  console.log("newsItems in Main:", newsItems);

  const handleShowMore = () => {
    setRenderedCards((prev)=> Math.min(prev + 3, 9));
  }
  return (
    <main className="main">
      <h2 className="main__title">Search results</h2>
      <section className="main__cards">
        <ul className="main__cards-list">
          {Array.isArray(newsItems.articles) &&
          newsItems.articles.length > 0 ? (
            newsItems.articles
              .slice(0, renderedCards)
              .map((item, index) => (
                <NewsCard
                  key={index}
                  data={item}
                  handleNewsSaved={handleNewsSaved}
                />
              ))
          ) : (
            <p>Nothing found</p>
          )}
        </ul>
        {renderedCards < 9 && renderedCards < newsItems.articles.length && (
          <ShowMore onClick={handleShowMore} />
        )}
        <About />
      </section>
    </main>
  );
}

export default Main;
