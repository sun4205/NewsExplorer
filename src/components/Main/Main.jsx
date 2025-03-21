import "./Main.css";
import NewsCard from "../NewsCard/NewsCard";
import About from "../About/About";
import ShowMore from "../ShowMore/ShowMore";


function Main({newsData,newsItems}) {
  console.log("newsItems in Main:", newsItems);
  return (
    <main className="main">
      <h2 className="main__title">Search results</h2>
      <section className="main__cards">
        <ul className="main__cards-list">
        {Array.isArray(newsItems.articles) && newsItems.articles.length > 0 ? (
            newsItems.articles.slice(0, 9).map((item, index) => (
              <NewsCard key={index} data={item} />
            ))
          ) : (
            <p>No news items available</p>
          )}
                 
        </ul>
        <ShowMore />
        <About />
       
      </section>
    </main>
  );
}

export default Main;
