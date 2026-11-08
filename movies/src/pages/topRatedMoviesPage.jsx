import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import { getTopRatedMovies } from "../api/tmdb-api";
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";

const TopRatedMoviesPage = () => {
  const [page, setPage] = useState(1);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["top_rated", { page: page }],
    queryFn: getTopRatedMovies,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  return (
    <>
      <PageTemplate
        title="Top Rated Movies"
        movies={movies}
        action={(movie) => {
          return <AddToPlaylistIcon movie={movie} />;
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "center", padding: 3 }}>
        <Pagination
          count={Math.min(data.total_pages, 500)}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </>
  );
};

export default TopRatedMoviesPage;
