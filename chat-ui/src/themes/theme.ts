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
        secondary: {
          dark: "#dfdfe2",
          main: "#eeeef0",
          light: "",
        },
        text: {
          primaryChannel: "#2A2D32",
        },
      },
    },
    dark: {
      palette: {
        mode: "dark",
        background: {
          default: "#1E2023",
        },
        primary: {
          main: "#8D51E1",
        },
        secondary: {
          dark: "",
          main: "#2A2D32",
          light: "#404045",
        },
      },
    },
  },
});

export default theme;
