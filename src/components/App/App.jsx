import React, { useEffect, useState } from "react";
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
import useDebounce from "../../hooks/useDebounce";
import RegisterMessage from "../RegisterMessage/RegisterMessage";

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

  const navigate = useNavigate();
  const location = useLocation();

  const openLoginModal = () => {
    console.log("opening login modal ");
    setActiveModal("login");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  function asyncSubmit(request) {
    setIsLoading(true);
    request()
      .then(closeActiveModal)

      .catch(console.error)

      .finally(() => setIsLoading(false));
  }

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

          getUserInfo(data.token)
            .then((userInfo) => {
              setCurrentUser(userInfo);
              console.log("User info updated:", userInfo);
            })
            .catch(console.error);
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (!jwt) return;

    api
      .getSavedNews({ token: jwt })
      .then((articles) => {
        setSavedArticles(articles);
        console.log("Saved get articles:", articles);
      })
      .catch(console.error);
  }, [jwt]);

  useEffect(() => {
    const jwtFromStorage = localStorage.getItem("jwt");
    console.log("JWT from storage:", jwtFromStorage);

    if (!jwtFromStorage) {
      console.log("No JWT found. Logging out.");
      setCurrentUser(null);
      setIsLoggedIn(false);
      return;
    }

    auth.getUserInfo(jwtFromStorage).then((userInfo) => {
      setCurrentUser(userInfo);
      setIsLoggedIn(true);
      console.log("userInfo", userInfo);
    });
  }, [jwt]);

  const handleLogOut = () => {
    token.removeToken();
    setIsLoggedIn(false);
    setCurrentUser(null);
    setJwt(null);
    navigate("/");
    console.log("User logged out successfully.");
  };

  const handleNewsSaved = (data) => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      console.log("No token found, user is not logged in.");
      return;
    }

    console.log("Received data in handleNewsSaved:", data);
    console.log("query", query);

    const { id, source, title, date, description, image, keywords } = data.data;

    api
      .savedNews({
        id,
        source,
        title,
        date,
        description,
        image,
        token,
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
    console.log("Before deletion, savedArticles:", savedArticles);
    console.log("Clicked article ID:", id);
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

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    console.log("Token from localStorage:", token);
    if (!token) return;

    api
      .getSavedNews(token)
      .then((articles) => {
        console.log("Fetched get saved articles:", articles);
        setSavedArticles(articles);
      })
      .catch((err) => {
        console.error("Error fetching saved articles", err);
      });
  }, []);

  const handleSearchSubmit = (values) => {
    console.log("handleSearchSubmit called with:", values);
    if (values.query.length < 3) return;

    asyncSubmit(() =>
      newsapi.getNewsCards(values.query).then((data) => {
        console.log("querydata", values.query);
        console.log("Fetched news data:", data);
        setNewsItems(data);
      })
    );
  };

  const handleRegisterSubmit = ({ email, password, username }) => {
    return auth.register(email, password, username);
  };
  useEffect(() => {
    if (query) {
      newsapi.getNewsCards(query).then((data) => {
        console.log("Fetched news data:", data);
        setNewsItems({ ...data, articles: data.articles || [] });
      });
    }
  }, [query]);

  //   useEffect(() => {
  //     localStorage.removeItem("savedArticles");
  //     setSavedArticles([]);
  // }, []);

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
            handleSearchSubmit={handleSearchSubmit}
            query={query}
            setQuery={setQuery}
            openLoginModal={openLoginModal}
            handleLogOut={handleLogOut}
            closeActiveModal={closeActiveModal}
          />

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
                      />
                    )}
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
          {location.pathname === "/" && <About />}
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
