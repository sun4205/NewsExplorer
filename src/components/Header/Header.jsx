import "./Header.css";
import NewsExplorer from "../../images/NewsExplorer.svg";
import NewsExplorerblack from "../../images/NewsExplorerblack.svg";
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
        <img src={savedNewsPage ? NewsExplorerblack : NewsExplorer} />
        <Navigation
          openLoginModal={openLoginModal}
          handleLogOut={handleLogOut}
        />
      </header>
      {location.pathname === "/" && (
        <SearchComponent
          query={query}
          setQuery={setQuery}
          handleSearchSubmit={handleSearchSubmit}
        />
      )}
    </div>
  );
}

export default Header;
