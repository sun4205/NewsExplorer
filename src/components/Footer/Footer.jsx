import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./Footer.css";
import github from "../../images/Vector.svg";

function Footer() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 320);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 320);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isMobile ? (
    <footer className="footer footer__mobile">
      <div className="footer__container">
        <div className="footer__links-item-left">
          <Link
            to="/"
            className="footer__link-item"
            onClick={() => window.scrollTo(0, 0)}
          >
            Home
          </Link>
          <a
            className="footer__link-item"
            href="https://github.com/sun4205"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="footer__link-gitHub" src={github} alt="GitHub" />
          </a>
        </div>
        <a
          className="footer__link-item footer__link-item-tripleten"
          href="https://tripleten.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          TripleTen
        </a>
        <p className="footer__paragraph footer__paragraph__mobile">
          © 2025 Supersite, Powered by News API
        </p>
      </div>
    </footer>
  ) : (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__paragraph">
          © 2025 Supersite, Powered by News API
        </p>
        <div className="footer__links-item-container">
          <Link
            to="/"
            className="footer__link-item"
            onClick={() => window.scrollTo(0, 0)}
          >
            Home
          </Link>
          <a
            className="footer__link-item"
            href="https://tripleten.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            TripleTen
          </a>
          <a
            className="footer__link-item"
            href="https://github.com/sun4205"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="footer__link-gitHub" src={github} alt="GitHub" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
