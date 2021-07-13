import { createTheme } from "@material-ui/core";
import { deepPurple, indigo, lightBlue, pink } from "@material-ui/core/colors";

export const getTheme = (darkMode) =>
  createTheme({
    ...(darkMode ? dark : light),
  });

const dark = createTheme({
  palette: {
    mode: "dark",
    primary: pink,
    secondary: deepPurple,
  },
});

const light = createTheme({
  palette: {
    mode: "light",
    primary: indigo,
    secondary: lightBlue,
  },
});
