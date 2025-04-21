import React from "react";

const SavedArticlesContext = React.createContext({
  savedArticles: [],
  setSavedArticles: () => {},
});

export default SavedArticlesContext;
