import "./Header.css";
import NewsExplorer from "../../images/NewsExplorer.svg";
import NewsExplorerblack from "../../images/NewsExplorerblack.svg";
import { useLocation } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";
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

  const savedNewsPage = location.pathname === "/saveNews";

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
        <SearchForm
          query={query}
          setQuery={setQuery}
          handleSearchSubmit={handleSearchSubmit}
        />
      )}
    </div>
  );
}

export default Header;
