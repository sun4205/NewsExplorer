import "./About.css";
import me from "../../images/hanna.png";

function About() {
  return (
    <div className="about">
      <img src={me} alt="author Picture" className="about__mypicture" />
      <div className="about__author">
        <h2 className="about__author-title">About the Author</h2>
        <div className="about__author-descriptions">
        <p className="about__author-description1">
          I am a Full Stack Engineer, transitioning from 10 years as a Dental
          Technician. I have strong skills in meeting deadlines, attention to
          detail, and teamwork.
        </p>
        <p className="about__author-description2">
          At TripleTen, I learned React, Node.js, and JavaScript. Now, I'm ready to use my skills to help customers by
          creating efficient and user-friendly applications.
        </p>
        </div>
      </div>
    </div>
  );
}

export default About;
