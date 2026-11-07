import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getPerson } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const ActorPage = () => {
  const { id } = useParams();

  const {
    data: actor,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["person", { id: id }],
    queryFn: getPerson,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;
  return (
    <Grid container spacing={5} sx={{ padding: "20px" }}>
      <Grid size={{ xs: 12, md: 3 }}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
          alt={actor.name}
          style={{ width: "100%", borderRadius: "8px" }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 9 }}>
        <Typography variant="h3">{actor.name}</Typography>
        <Typography variant="h6">
          Born: {actor.birthday}, {actor.place_of_birth}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: 2 }}>
          {actor.biography}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ActorPage;
