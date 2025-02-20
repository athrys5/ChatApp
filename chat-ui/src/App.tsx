import { Box } from "@mui/material";
import WaitingRoom from "./components/WaitingRoom";
import { useState } from "react";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { IMessage } from "./interfaces/GenericInterfaces";
import ChatRoom from "./components/ChatRoom";

function App() {
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

  return (
    <Box>
      <div>Welcome to chat app!</div>
      {!connection ? (
        <WaitingRoom joinChatRoom={joinChatRoom} />
      ) : (
        <ChatRoom messages={messages} />
      )}
    </Box>
  );
}

export default App;
