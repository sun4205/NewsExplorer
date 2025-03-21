import "./Header.css";
import logo from "../../images/logo.jpg";
import { useLocation } from "react-router-dom";
import SearchComponent from "../SearchComponent/SearchComponent";

import Navigation from "../Navigation/Navigation";

function Header({
  handleSearchSubmit,
  query,
  setQuery,
  openLoginModal,
  handleLogOut,
}) {
  console.log("Header!");
  const location = useLocation();

  const savedNewsPage = location.pathname === "/savedNews";

  return (
    <div
      className={`header__container ${savedNewsPage ? "no-background" : ""}`}
    >
      <header className={`header ${savedNewsPage ? "no-background" : ""}`}>
        <img src={logo} alt={logo} className="header__logo" />
        <Navigation
          openLoginModal={openLoginModal}
          handleLogOut={handleLogOut}
        />
      </header>
      {location.pathname === "/" && (
        <SearchComponent query={query} setQuery={setQuery} handleSearchSubmit={handleSearchSubmit} />
      )}
    </div>
  );
}

export default Header;
