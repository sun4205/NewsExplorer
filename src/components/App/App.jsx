import React, { useEffect, useState, useMemo } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import * as auth from "../../utils/auth";
import * as api from "../../utils/api";
import * as newsapi from "../../utils/NewsApi";
import * as token from "../../utils/token";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import Footer from "../Footer/Footer";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import SavedArticlesContext from "../../contexts/SavedArticlesContext";
import SavedArticles from "../SavedArticles/SavedArticles";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import About from "../About/About";
import RegisterMessage from "../RegisterMessage/RegisterMessage";
import debounce from "lodash.debounce";
import SearchForm from "../SearchForm/SearchForm";

function App() {
  const [query, setQuery] = useState("");
  const [newsData, setNewsData] = useState({
    source: "",
    title: "",
    date: "",
    description: "",
    image: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [newsItems, setNewsItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jwt, setJwt] = useState(token.getToken());
  const [savedArticles, setSavedArticles] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const openLoginModal = () => {
    setActiveModal("login");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setJwt(data.token);
          setIsLoggedIn(true);
          console.log("Login successful!");

          auth
            .getUserInfo(data.token)
            .then((userInfo) => {
              setCurrentUser(userInfo);
              console.log("User info updated:", userInfo);
            })
            .catch(console.error);
        }
      })
      .catch(console.error);
  };

  const handleLogOut = () => {
    token.removeToken();
    setIsLoggedIn(false);
    setCurrentUser(null);
    setJwt(null);
    navigate("/");
    console.log("User logged out successfully.");
  };

  const handleNewsSaved = (data) => {
    if (!jwt) {
      console.log("No token found, user is not logged in.");
      return;
    }

    const { id, source, title, date, description, image, keywords } = data.data;

    api
      .savedNews({
        id,
        source,
        title,
        date,
        description,
        image,
        token: jwt,
        keywords,
      })
      .then((response) => {
        console.log("savedNews API response:", response);
      })
      .catch((error) => {
        console.error("Error calling savedNews API:", error);
      });
  };

  const handleRemoveArticle = (id) => {
    const token = localStorage.getItem("jwt");

    api
      .removeNewsCardSaved(id, token)
      .then(() => {
        setSavedArticles((prevArticles) =>
          prevArticles.filter((article) => article.id !== id)
        );
      })
      .catch((err) => console.error("Failed to delete article:", err));
  };

  const debouncedFetch = useMemo(() => {
    return debounce((searchTerm) => {
      setIsLoading(true);
      newsapi.getNewsCards(searchTerm).then((data) => {
        setNewsItems(data);
        setIsSearched(true);
        setIsLoading(false);
      });
    }, 1000);
  }, []);

  const handleRegisterSubmit = ({ email, password, username }) => {
    return auth.register(email, password, username);
  };

  useEffect(() => {
    if (!jwt) {
      setCurrentUser(null);
      setIsLoggedIn(false);
      return;
    }

    setIsLoading(true);

    Promise.all([auth.getUserInfo(jwt), api.getSavedNews({ token: jwt })])
      .then(([userInfo, savedArticles]) => {
        setCurrentUser(userInfo);
        setIsLoggedIn(true);
        setSavedArticles(savedArticles);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [jwt]);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <SavedArticlesContext.Provider
        value={{
          savedArticles,
          setSavedArticles,
        }}
      >
        <div className="page">
          <Header
            openLoginModal={openLoginModal}
            handleLogOut={handleLogOut}
            closeActiveModal={closeActiveModal}
          />
          {location.pathname === "/" && (
            <SearchForm
              query={query}
              setQuery={setQuery}
              debouncedFetch={debouncedFetch}
            />
          )}

          <div className="page-content">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    {query && (
                      <Main
                        newsData={newsData}
                        newsItems={newsItems}
                        handleNewsSaved={handleNewsSaved}
                        isLoading={isLoading}
                        isSearched={isSearched}
                      />
                    )}
                    {location.pathname === "/" && <About query={query}/>}
                  </>
                }
              />
              <Route
                path="/saveNews"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <SavedArticles
                      savedArticles={savedArticles}
                      handleRemoveArticle={handleRemoveArticle}
                      setSavedArticles={setSavedArticles}
                      keywords={keywords}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          {/* {location.pathname === "/" && <About />} */}
          <Footer />
        </div>

        {activeModal === "login" && (
          <LoginModal
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            handleLogin={handleLogin}
            setActiveModal={setActiveModal}
          />
        )}
        {activeModal === "register" && (
          <RegisterModal
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            handleRegisterSubmit={handleRegisterSubmit}
            setActiveModal={setActiveModal}
          />
        )}
        {activeModal === "registerSuccess" && (
          <RegisterMessage
            closeActiveModal={closeActiveModal}
            setActiveModal={setActiveModal}
          />
        )}
      </SavedArticlesContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
