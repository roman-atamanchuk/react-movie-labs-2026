import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#f5c518" }, // gold: buttons, icons, chips
    secondary: { main: "#e50914" }, // red: header bar, Reviews button
    background: {
      default: "#141414", // page background
      paper: "#1f1f1f", // cards
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

export default theme;
