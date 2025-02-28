import { Box, Button, Grow, Grid2, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import LoginTextField from "../components/LoginComponents/LoginTextField";
import { standardButtonStyle } from "../styles/styles";
import MessageIcon from "../icons/MessageIcon";
import { loginUser } from "../services/AuthService";
import useNavigateCustom from "../helpers/navigateHelper";
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { IMessage } from "../interfaces/GenericInterfaces";

function Login() {
  const { navigateToChatroom, navigateToRegister } = useNavigateCustom();

  const theme = useTheme();

  const [chatroom, setChatroom] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [connection, setConnection] = useState<HubConnection>();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [connectedUsers, setConnectedUsers] = useState<string[]>([]);

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

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await loginUser(email, password);
      console.log("Login successful:", response);

      await joinChatRoom(email, chatroom);

      navigateToChatroom(parseInt(chatroom));
    } catch (error) {
      setError("Login failed. Please try again.");
      console.error("Login error:", error);
    }
  };

  const signInComponent = (
    <Grid2 container justifyContent='center' spacing={4}>
      <Grid2 size={{ xs: 8, md: 4, lg: 3, xl: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant='h3' fontWeight='500'>
            Sign in
          </Typography>
        </Box>
        <Box component='form' onSubmit={handleSignIn} sx={{ mt: 1 }}>
          <LoginTextField onChange={setEmail} inputName='email' />
          <LoginTextField onChange={setPassword} inputName='password' />
          <LoginTextField onChange={setChatroom} inputName='chatroom' />

          <Box sx={{ mt: 2 }}>
            <Button
              type='submit'
              variant='contained'
              fullWidth
              sx={standardButtonStyle}
            >
              <Typography fontWeight='500' letterSpacing={0.5}>
                Join
              </Typography>
            </Button>
          </Box>
          <Box
            sx={{ cursor: "pointer", paddingTop: "4px" }}
            onClick={navigateToRegister} //todo : change render logic
          >
            <Typography color='primary'>
              Not registered yet ? Click here
            </Typography>
          </Box>
        </Box>
      </Grid2>
    </Grid2>
  );

  return (
    <Grid2 container sx={{ padding: "16px" }}>
      <Grid2 size={12} sx={{ display: "flex", justifyContent: "center" }}>
        <MessageIcon
          width='200'
          height='200'
          currentColor={theme.palette.primary.main}
        />
      </Grid2>
      <Grid2 size={12}>{signInComponent}</Grid2>
    </Grid2>
  );
}

export default Login;
