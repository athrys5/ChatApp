import { Box } from "@mui/material";
import WaitingRoom from "./components/WaitingRoom";
import { useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

function App() {
  const [connection, setConnection] = useState();

  const joinChatRoom = async (username: string, chatroom: string) => {
    try {
      // Initiate connection
      const conn = new HubConnectionBuilder()
        .withUrl("https://localhost:7098")
        .configureLogging(LogLevel.Information)
        .build();

      // Set up connection handler
      conn.on("JoinSpecificChatRoom", (username: string, msg: string) => {
        console.log("msg:", msg);
      });

      // Start connection
      await conn.start();

      // Invoke the endpoint
      await conn.invoke("JoinSpecificChatRoom", { username, chatroom });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box>
      <div>Welcome to chat app!</div>
      <WaitingRoom joinChatRoom={joinChatRoom} />
    </Box>
  );
}

export default App
