import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./Footer.css";
import github from "../../images/Vector.svg";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__paragraph">© 2025 Supersite, Powered by News API</p>

      <div className="footer__links-group">
        <div className="footer__text-links">
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
        </div>

        <div className="footer__icon-links">
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
