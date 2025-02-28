import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./themes/theme";
import { createBrowserRouter, RouterProvider } from "react-router";
import { CLIENT_ROUTES } from "./costants/ClientRoutes";

function App() {
  /*  const sendMessage = async (message: string) => {
    try {
      // Send message
      await connection?.invoke("SendMessage", message);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = async () => {
      if (connection) {
        try {
          // Notify the server that the user is leaving
          await connection.invoke("LeaveChatroom");
        } catch (e) {
          console.error("Error leaving chatroom:", e);
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [connection]); */

  const router = createBrowserRouter(CLIENT_ROUTES);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <RouterProvider router={router} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
