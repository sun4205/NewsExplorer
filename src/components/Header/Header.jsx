import "./Header.css";
import logo from "../../images/logo.jpg";
import SearchForm from "../SearchForm/SearchForm";


function Header() {
  return (
    <div className="header__container">
    <header className="header">
      <img src={logo} alt={logo} class="header__logo" />
      <div className="header__nav">
        <button className="header__homge-btn">Home</button>
        <button className="header__signIn-btn">Sign In</button>
      </div>
    </header>
    <SearchForm />
    </div>
  );
}

export default Header;
