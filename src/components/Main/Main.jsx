import "./Main.css";
import NewsCard from "../NewsCard/NewsCard";
import About from "../About/About";
import ShowMore from "../ShowMore/ShowMore";


function Main() {
  return (
    <main className="main">
      <h2 className="main__title">Search results</h2>
      <section className="main__cards">
        <ul className="main__cards-list">
          <NewsCard />          
        </ul>
        <ShowMore />
        <About />
       
      </section>
    </main>
  );
}

export default Main;
