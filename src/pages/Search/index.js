import React, { useState, useEffect } from "react";
import Container from "../../components/Container";
import SearchForm from "../../components/SearchForm";
import SearchResults from "../../components/SearchResults";
import Alert from "../../components/Alert";
import API from "../../utils/API";

function Search() {

  // const [search, setSearch] = useState("Wikipedia");
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [url, setUrl] = useState("");
  // const [error, setError] = useState("");

  // put useState hooks in one object
  const [wikiSearch, setWikiSearch] = useState({
    search: "Wikipedia",
    title: "",
    description: "",
    url: "",
    error: ""
  });

  // When the component mounts, update the title to be Wikipedia Searcher
  useEffect(() => {
    document.title = "Wikipedia Searcher";

    if (!wikiSearch.search) {
      return;
    }

    API.searchTerms(wikiSearch.search)
      .then(res => {
        console.log("results in useEffect", res);

        if (res.data.length === 0) {
          throw new Error("No results found.");
        }
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        // setTitle(res.data[1]);
        // setDescription(res.data[2][0]);
        // setUrl(res.data[3][0]);
        setWikiSearch({
          title: res.data[1],
          description: res.data[2][0],
          url: res.data[3][0],
          error: ""
        });
      })
      .catch(err => setWikiSearch({ error: err.message }));
  }, [ wikiSearch.search]);

  const handleInputChange = event => {
    setWikiSearch(event.target.value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
  };
  return (
    <div>
      <Container style={{ minHeight: "100vh" }}>
        <h1 className="text-center">Search For Anything on Wikipedia</h1>
        <Alert type="danger" style={{ opacity: wikiSearch.error ? 1 : 0, marginBottom: 10 }}>
          {wikiSearch.error}
        </Alert>
        <SearchForm
          handleFormSubmit={handleFormSubmit}
          handleInputChange={handleInputChange}
          results={wikiSearch.search}
        />
        <SearchResults title={wikiSearch.title} description={wikiSearch.description} url={wikiSearch.url} />
      </Container>
    </div>
  );
}

export default Search;
