import "./About.css";
import news from "../../images/newspaper.png";

function About({ query }) {
  return (
    <>
      <section className="about">
        <div className="about__wrapper">
        <div className="about__mypicture-wrapper">
          <img src={news} alt="author" className="about__mypicture" />
          </div>
          <div className="about__author">
            <h2 className="about__author-title">About the App</h2>
            <div className="about__author-descriptions">
              <p className="about__author-description1">
              NewsExplorer helps users search and save news articles.  
              It is built with React, JavaScript, Node.js and the News API.                
              </p>
              <p className="about__author-description2">
              Users can sign up, log in, and search for news using keywords.
They can save articles they like and read them later on any device — desktop, tablet, or mobile.
              </p>
            </div>
          </div>
        </div>
      </section>
      {!query && <div className="about__spacer"></div>}
    </>
  );
}

export default About;
