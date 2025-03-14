import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__paragrph"> © 2025 Supersite, Powered by News API</p>
      <div className="footer__link">
        <a classNam="footer__link-item" href="/">Home</a>
        <a classNam="footer__link-item" href="https://tripleten.com/" target="_blank">
          TripleTen
        </a>
        <a classNam="footer__link-item" href="https://github.com/sun4205" target="_blank">
          GitHub
        </a>
      </div>
    </footer>
  );
}

export default Footer;
