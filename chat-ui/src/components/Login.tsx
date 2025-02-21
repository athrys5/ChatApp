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
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1 }}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
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
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
