import { Box } from "@mui/material";
import { useColorScheme, useTheme } from "@mui/material/styles";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
function ModeSwitcher() {
  const { mode, setMode } = useColorScheme();
  const theme = useTheme();
  if (!mode) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        position: "absolute",
        top: 20,
        right: 40,
        alignItems: "center",
        cursor: "pointer",
        width: 40,
        height: 40,
        borderRadius: "50%",
        backgroundColor: theme.palette.mode === "dark" ? "white" : "black",
        color: theme.palette.mode === "dark" ? "black" : "white",
        boxShadow: 3,
        transition: "background-color 0.3s, color 0.3s", // Transizione fluida
      }}
      onClick={() => setMode(mode === "light" ? "dark" : "light")}
    >
      {theme.palette.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </Box>
  );
}

export default ModeSwitcher;
