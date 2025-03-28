import "./Footer.css";
import github from "../../images/Vector.svg";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__paragrph"> © 2025 Supersite, Powered by News API</p>
      <div className="footer__link_container">
        <div className="footer__link">
          <a className="footer__link-item" href="/">
            Home
          </a>
          <a
            className="footer__link-item"
            href="https://tripleten.com/"
            target="_blank"
          >
            TripleTen
          </a>
        </div>

        <div classname="footer__link-right">
          <a
            className="footer__link-item footer__link-item_gitHub"
            href="https://github.com/sun4205"
            target="_blank"
          >
            <img src={github}></img>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
