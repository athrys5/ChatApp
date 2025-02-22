import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { useState } from "react";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { IMessage } from "./interfaces/GenericInterfaces";
import ChatRoom from "./components/ChatRoom";
import Login from "./components/LoginComponents/Login";
import theme from "./themes/theme";
import ModeSwitcher from "./components/ModeSwitcher";

function App() {
  const [username, setUsername] = useState<string>("");
  const [chatroom, setChatroom] = useState<string>("");
  const [connection, setConnection] = useState<HubConnection>();
  const [messages, setMessages] = useState<IMessage[]>([]);

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

      // Start connection
      await connection.start();

      // Invoke the endpoint
      await connection.invoke("JoinSpecificChatRoom", { username, chatroom });

      setConnection(connection);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(messages);
  const sendMessage = async (message: string) => {
    try {
      // Send message
      await connection?.invoke("SendMessage", message);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <ModeSwitcher />
        {!connection ? (
          <Login
            joinChatRoom={joinChatRoom}
            username={username}
            chatroom={chatroom}
            setUsername={setUsername}
            setChatroom={setChatroom}
          />
        ) : (
          <ChatRoom
            messages={messages}
            sendMessage={sendMessage}
            username={username}
            chatroom={chatroom}
          />
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
