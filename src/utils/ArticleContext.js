import React from 'react';
// imr tab is shortcut for above line

const ArticleContext = React.createContext({
  search: "",
    title: "",
    description: "",
    url: "",
    error: "",
});

export default ArticleContext;