import React, { useContext } from 'react';
import "./style.css";
import ArticleContext from "../../utils/ArticleContext";

function SearchResults() {
  const artContext = useContext(ArticleContext);
  return (
    <ul className="list-group search-results">
      <li className="list-group-item">
        <h2>{artContext.title}</h2>
        <p>{artContext.description}</p>
        <a href={artContext.url}>{artContext.url}</a>
      </li>
    </ul>
  );
}

export default SearchResults;
