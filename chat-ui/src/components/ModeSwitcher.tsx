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
        backgroundColor: "primary.main",
        color: "background.default",
        boxShadow: 3,
        transition: "background-color 0.3s, color 0.3s, transform 0.3s",
        "&:hover": {
          backgroundColor: "primary.dark",
          transform: "scale(1.1)",
        },
      }}
      onClick={() => setMode(mode === "light" ? "dark" : "light")}
    >
      {theme.palette.mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
    </Box>
  );
}

export default ModeSwitcher;
