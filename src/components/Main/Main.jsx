import "./Main.css";
import NewsCard from "../NewsCard/NewsCard";
import About from "../About/About";

function Main() {
  return (
    <main className="main">
      <h2 className="main__title">Search results</h2>
      <section className="cards">
        <ul className="cards__list">
          <NewsCard />
        </ul>
        <About />
      </section>
    </main>
  );
}

export default Main;
