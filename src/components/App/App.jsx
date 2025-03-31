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

  function getUserInformation(token) {
    return auth
      .getUserInfo(token)
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
      })
      .catch(console.error);
  }

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          token.setToken(data.token);
          setJwt(data.token);
          setIsLoggedIn(true);
          console.log("Login successful!.");
          getUserInformation(data.token).then((userInfo) => {
            setCurrentUser(userInfo);
            console.log("User info updated:", userInfo);
            const redirectPath = location.state?.from?.pathname || "/";
            console.log("redirectPath", redirectPath);
            navigate(redirectPath);
            closeActiveModal();
          });
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    const jwtFromStorage = token.getToken();
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
    console.log("Received data in handleNewsSaved:", data);
    console.log("data.id:", data.data.id);

    const { id, source, title, publishedAt, description, urlToImage } =
      data.data;

    const storedArticles =
      JSON.parse(localStorage.getItem("savedArticles")) || [];

    const storedKeywords =
      JSON.parse(localStorage.getItem("savedKeywords")) || [];

    const updatedKeywords = storedKeywords.includes(query)
      ? storedKeywords
      : [...storedKeywords, query];
    localStorage.setItem("savedKeywords", JSON.stringify(updatedKeywords));
    setSavedArticles(updatedKeywords);

    api
      .savedNews({
        articleId: id,
        source: source?.name,
        title,
        date: publishedAt,
        description,
        image: urlToImage,
        keywords: updatedKeywords,
      })
      .then((updatedData) => {
        console.log("updateddataa", updatedData);
        console.log("Save successful:", updatedData);
        console.log("Keywords:", updatedData.keywords);
        console.log(
          "Is keywords an array?",
          Array.isArray(updatedData.keywords)
        );
        const newSavedArticles = [...storedArticles, updatedData];
        console.log("newsSavedArticles", newSavedArticles);

        localStorage.setItem("savedArticles", JSON.stringify(newSavedArticles));

        return setSavedArticles(newSavedArticles);
        console.log("newsSavedArticles", newSavedArticles);
      })
      .catch(console.error);
  };

  const handleRemoveArticle = (articleId) => {
    api
      .removeNewsCardSved(articleId)
      .then(() => {
        const storedArticles =
          JSON.parse(localStorage.getItem("savedArticles")) || [];

        const updatedArticles = storedArticles.filter(
          (article) => article.articleId !== articleId
        );

        localStorage.setItem("savedArticles", JSON.stringify(updatedArticles));

        setSavedArticles(updatedArticles);
      })
      .catch(console.error);
  };

  const handleSearchSubmit = (values) => {
    console.log("handleSearchSubmit called with:", values);
    if (values.query.length < 3) return;

    localStorage.setItem("query", values.query);
    asyncSubmit(() =>
      newsapi.getNewsCards(values.query).then((data) => {
        console.log("Fetched news data:", data);
        setNewsItems(data);
      })
    );
  };

  const handleRegisterSubmit = (values) => {
    asyncSubmit(() =>
      auth.register(values.email, values.password, values.username).then(() => {
        handleLogin(values.email, values.password, () => {});
      })
    );
  };

  useEffect(() => {
    newsapi.getNewsCards(query).then((data) => {
      console.log("Fetched news data:", data);
      setNewsItems({ ...data, articles: data.articles || [] });
    });
  }, [query]);

  useEffect(() => {
    const storedSavedArticles =
      JSON.parse(localStorage.getItem("savedArticles")) || [];
    console.log("Loaded savedArticles from localStorage:", storedSavedArticles);
    setSavedArticles(storedSavedArticles);
  }, []);

  useEffect(() => {
    const savedQuary = localStorage.getItem("query");
    if (savedQuary) {
      setQuery(savedQuary);
    }
  }, []);

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
