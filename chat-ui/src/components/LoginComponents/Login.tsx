import { Box, Button, Container, Typography } from "@mui/material";
import MessageIcon from "../../icons/MessageIcon";
import LoginTextField from "./LoginTextField";
import { standardButtonStyle } from "../../styles/styles";

interface ILoginProps {
  joinChatRoom: (username: string, chatroom: string) => Promise<void>;
  username: string;
  chatroom: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setChatroom: React.Dispatch<React.SetStateAction<string>>;
}

const Login: React.FC<ILoginProps> = ({
  joinChatRoom,
  username,
  chatroom,
  setUsername,
  setChatroom,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Previeni il ricaricamento della pagina
    joinChatRoom(username, chatroom);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          padding: "32px",
          boxSizing: "border-box",
          border: "1px solid transparent",
          borderRadius: "1em",
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
          <Typography variant='h3' fontWeight='500'>
            Sign in
          </Typography>

          <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <LoginTextField onChange={setUsername} inputName='username' />
            <LoginTextField onChange={setChatroom} inputName='chatroom' />
            <Box sx={{ mt: 2 }}>
              <Button
                type='submit'
                variant='contained'
                fullWidth
                sx={standardButtonStyle}
              >
                <Typography fontWeight='500'>Join</Typography>
              </Button>
            </Box>
            {/*   <Typography color='primary'>Register here</Typography> */}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
