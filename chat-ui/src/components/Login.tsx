import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MessageIcon from "../icons/MessageIcon";

interface ILoginProps {
  joinChatRoom: (username: string, chatroom: string) => Promise<void>;
}

const Login: React.FC<ILoginProps> = ({ joinChatRoom }) => {
  const [username, setUsername] = useState<string>("");
  const [chatroom, setChatroom] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Previeni il ricaricamento della pagina
    joinChatRoom(username, chatroom);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          padding: "32px",
          boxSizing: "border-box",
          border: "1px solid transparent",
          borderRadius: "1em",
          backgroundColor: "",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <MessageIcon width='200' height='200' currentColor='#8D51E1' />

          <Typography variant='h2'>Login</Typography>
          <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='username'
              label='Username'
              name='username'
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='chatroom'
              label='Chatroom'
              id='chatroom'
              onChange={(e) => setChatroom(e.target.value)}
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Typography color='primary'>Register here</Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
