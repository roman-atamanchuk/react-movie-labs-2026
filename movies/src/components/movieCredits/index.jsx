import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import { useQuery } from "@tanstack/react-query";
import { getMovieCredits } from "../../api/tmdb-api";
import Spinner from "../spinner";

export default function MovieCredits({ movie }) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["credits", { id: movie.id }],
    queryFn: getMovieCredits,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const cast = data.cast.slice(0, 10);
  return (
    <Paper
      component="ul"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        listStyle: "none",
        padding: 1.5,
      }}
    >
      <li>
        <Chip label="Cast" color="primary" sx={{ margin: 0.5 }} />
      </li>
      {cast.map((actor) => (
        <li key={actor.id}>
          <Chip
            label={`${actor.name} as ${actor.character}`}
            sx={{ margin: 0.5 }}
          />
        </li>
      ))}
    </Paper>
  );
}
