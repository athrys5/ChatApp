import { Box, Button, Container, Grid2, Typography } from "@mui/material";
import MessageIcon from "../../icons/MessageIcon";
import LoginTextField from "./LoginTextField";
import { standardButtonStyle } from "../../styles/styles";
import { useState } from "react";

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
  const [showRegisterForm, setShowRegisterForm] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Previeni il ricaricamento della pagina
    joinChatRoom(username, chatroom);
  };

  const signInComponent = (
    <Grid2 container justifyContent='center'>
      <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant='h3' fontWeight='500'>
            Sign in
          </Typography>
        </Box>
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
          <Box
            sx={{ cursor: "pointer", paddingTop: "4px" }}
            onClick={() => setShowRegisterForm((prev) => !prev)} //todo : change render logic
          >
            <Typography color='primary'>
              Not registered yet ? Click here
            </Typography>
          </Box>
        </Box>
      </Grid2>
      {showRegisterForm ? (
        <Grid2 size={{ xs: 12, md: 6, lg: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant='h3' fontWeight='500'>
              Register
            </Typography>
          </Box>
        </Grid2>
      ) : null}
    </Grid2>
  );

  return (
    <Grid2 container sx={{ padding: "16px" }}>
      <Grid2
        size={12}
        sx={{ display: "flex", justifyContent: "center", marginTop: "5%" }}
      >
        <MessageIcon width='200' height='200' currentColor='#8D51E1' />
      </Grid2>
      <Grid2 size={12}>{signInComponent}</Grid2>
    </Grid2>
  );
};

export default Login;
