import { useQuery } from "@tanstack/react-query";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import { getPlayingNowMovies } from "../api/tmdb-api";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";
const NowPlayingMoviesPage = () => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["now_playing"],
    queryFn: getPlayingNowMovies,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;

  return (
    <PageTemplate
      title="Now Playing"
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />;
      }}
    />
  );
};

export default NowPlayingMoviesPage;
