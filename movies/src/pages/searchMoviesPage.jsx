import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import { searchMovies } from "../api/tmdb-api";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const SearchMoviesPage = () => {
  const [text, setText] = useState("");
  const [query, setQuery] = useState("");

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["search", { query: query }],
    queryFn: searchMovies,
    enabled: query !== "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(text.trim());
  };

  let results = null;
  if (query === "") {
    results = (
      <h3 style={{ textAlign: "center" }}>
        Type a movie title and press Enter
      </h3>
    );
  } else if (isPending) {
    results = <Spinner />;
  } else if (isError) {
    results = <h1>{error.message}</h1>;
  } else {
    results = (
      <PageTemplate
        title={`Results for "${query}"`}
        movies={data.results}
        action={(movie) => <AddToFavoritesIcon movie={movie} />}
      />
    );
  }

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", justifyContent: "center", padding: 3 }}
      >
        <TextField
          label="Search all movies"
          variant="outlined"
          value={text}
          onChange={(e) => setText(e.target.value)}
          sx={{ width: "60%" }}
        />
      </Box>
      {results}
    </>
  );
};

export default SearchMoviesPage;
