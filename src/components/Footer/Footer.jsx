import { Link, useLocation } from "react-router-dom";
import "./Footer.css";
import github from "../../images/Vector.svg";

function Footer() {
  const location = useLocation();
  const isMobile = window.matchMedia("(max-width: 320px)").matches;
  return (
    // <footer className="footer">
    //   <div className="footer__container">
    //     <p className="footer__paragrph">
    //       {" "}
    //       © 2025 Supersite, Powered by News API
    //     </p>

    //     <div className="footer__links-item-container">
    //       <Link to="/" className="footer__link-item">
    //         Home
    //       </Link>
    //       <a
    //         className="footer__link-item"
    //         href="https://tripleten.com/"
    //         target="_blank"
    //       >
    //         TripleTen
    //       </a>
    //       <a
    //         className="footer__link-item"
    //         href="https://github.com/sun4205"
    //         target="_blank"
    //       >
    //         <img className=" footer__link-gitHub" src={github}></img>
    //       </a>
    //     </div>
    //   </div>
    // </footer>
    <footer className="footer">
      <div className="footer__container">
        {isMobile && <p className="footer__paragraph">© 2025 Supersite, Powered by News API</p>}

        <div className="footer__links-item-container">
          <div className="footer__links-item-left">
            <Link to="/" className="footer__link-item">Home</Link>
            <a className="footer__link-item" href="https://tripleten.com/" target="_blank" rel="noopener noreferrer">TripleTen</a>
          </div>
          <div className="footer__links-item-right">
            <a className="footer__link-item" href="https://github.com/sun4205" target="_blank" rel="noopener noreferrer">
              <img className="footer__link-gitHub" src={github} alt="GitHub" />
            </a>
          </div>
        </div>

        {!isMobile && <p className="footer__paragraph">© 2025 Supersite, Powered by News API</p>}
      </div>
    </footer>
  
  
  );
}

export default Footer;
