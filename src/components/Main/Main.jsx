import "./Main.css";
import NewsCard from "../NewsCard/NewsCard";
import About from "../About/About";
import ShowMore from "../ShowMore/ShowMore";


function Main({newData, newsItems}) {
  return (
    <main className="main">
      <h2 className="main__title">Search results</h2>
      <section className="main__cards">
        <ul className="main__cards-list">
          {newsItems.slice(0,9).map((item,index)=>(<NewsCard key={index} data={item}/>   ))}
                 
        </ul>
        <ShowMore />
        <About />
       
      </section>
    </main>
  );
}

export default Main;
