import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { IMessage } from "./interfaces/GenericInterfaces";
import ChatRoom from "./components/ChatRoom";

import theme from "./themes/theme";
import ModeSwitcher from "./components/ModeSwitcher";
import AuthorizeView from "./components/LoginComponents/AuthorizeView";
import { createBrowserRouter, RouterProvider } from "react-router";
import { CLIENT_ROUTES } from "./costants/ClientRoutes";

function App() {
  const [username, setUsername] = useState<string>("");
  const [chatroom, setChatroom] = useState<string>("");
  const [connection, setConnection] = useState<HubConnection>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [connectedUsers, setConnectedUsers] = useState<string[]>([]); // State for connected users

  const joinChatRoom = async (username: string, chatroom: string) => {
    try {
      // Initiate connection
      const connection = new HubConnectionBuilder()
        .withUrl("http://localhost:5038/chat")
        .configureLogging(LogLevel.Information)
        .build();

      // Set up connection handler
      connection.on("JoinSpecificChatRoom", (username: string, msg: string) => {
        setMessages((prevMessages) => [...prevMessages, { username, msg }]);
      });

      // Receive messages to state
      connection.on(
        "ReceiveSpecificMessage",
        (username: string, msg: string) => {
          setMessages((prevMessages) => [...prevMessages, { username, msg }]);
        }
      );

      // Listen for updates to the connected users list
      connection.on("ReceiveUserList", (users: string[]) => {
        setConnectedUsers(users); // Update the list of connected users
      });

      // Start connection
      await connection.start();

      // Invoke the endpoint to join the chat room
      await connection.invoke("JoinSpecificChatRoom", { username, chatroom });

      // Set the connection state
      setConnection(connection);
    } catch (e) {
      console.log(e);
    }
  };

  const sendMessage = async (message: string) => {
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
  }, [connection]);

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
