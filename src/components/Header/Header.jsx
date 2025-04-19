import "./Header.css";
import NewsExplorer from "../../images/NewsExplorer.svg";
import NewsExplorerblack from "../../images/NewsExplorerblack.svg";
import { useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header({ openLoginModal, closeActiveModal, handleLogOut }) {
  const location = useLocation();

  const savedNewsPage = location.pathname === "/saveNews";

  return (
    // <div
    //   className={`header__container ${savedNewsPage ? "no-background" : ""}`}
    // >
      <header className={`header ${savedNewsPage ? "no-background" : ""}`}>
         <div className="header__logo-wrapper">
        <img
          src={savedNewsPage ? NewsExplorerblack : NewsExplorer}
          className="header__logo"
        />
        </div>
        <Navigation
          openLoginModal={openLoginModal}
          handleLogOut={handleLogOut}
          closeActiveModal={closeActiveModal}
        />
      </header>
    // </div>
  );
}

export default Header;
