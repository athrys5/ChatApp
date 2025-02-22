import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        mode: "light",
        background: {
          default: "#ffffff",
        },
        primary: {
          main: "#8D51E1",
        },
      },
    },
    dark: {
      palette: {
        mode: "dark",
        background: {
          default: "#212121",
        },
        primary: {
          main: "#8D51E1",
        },
      },
    },
  },
});

export default theme;
