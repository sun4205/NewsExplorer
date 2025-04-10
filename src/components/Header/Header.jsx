import "./Header.css";
import NewsExplorer from "../../images/NewsExplorer.svg";
import NewsExplorerblack from "../../images/NewsExplorerblack.svg";
import { useLocation } from "react-router-dom";
import SearchForm from "../SearchForm/SearchForm";
import Navigation from "../Navigation/Navigation";

function Header({
  debouncedFetch,
  query,
  setQuery,
  openLoginModal,
  closeActiveModal,
  handleLogOut,
}) {
 
  const location = useLocation();

  const savedNewsPage = location.pathname === "/saveNews";

  return (
    <div
      className={`header__container ${savedNewsPage ? "no-background" : ""}`}
    >
      <header className={`header ${savedNewsPage ? "no-background" : ""}`}>
        <img src={savedNewsPage ? NewsExplorerblack : NewsExplorer} className="header__logo"/>
        <Navigation
          openLoginModal={openLoginModal}
          handleLogOut={handleLogOut}
          closeActiveModal={closeActiveModal}
        />
      </header>

      {location.pathname === "/" && (
        <SearchForm
          query={query}
          setQuery={setQuery}
          debouncedFetch={debouncedFetch}
        />
      )}
    </div>
  );
}

export default Header;
