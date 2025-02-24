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

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault(); // Previeni il ricaricamento della pagina
    joinChatRoom(username, chatroom);
  };

  const handleRegister = (e: React.FormEvent) => {};

  const signInComponent = (
    <Grid2 container justifyContent='center' spacing={4}>
      {!showRegisterForm ? (
        <Grid2 size={{ xs: 8, md: 4, lg: 3, xl: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant='h3' fontWeight='500'>
              Sign in
            </Typography>
          </Box>
          <Box component='form' onSubmit={handleSignIn} sx={{ mt: 1 }}>
            <LoginTextField onChange={setUsername} inputName='username' />
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
              onClick={() => setShowRegisterForm((prev) => !prev)} //todo : change render logic
            >
              <Typography color='primary'>
                Not registered yet ? Click here
              </Typography>
            </Box>
          </Box>
        </Grid2>
      ) : (
        <Grid2 size={{ xs: 8, md: 4, lg: 3, xl: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant='h3' fontWeight='500'>
              Register
            </Typography>
          </Box>
          <Box component='form' onSubmit={handleRegister} sx={{ mt: 1 }}>
            <LoginTextField onChange={setUsername} inputName='username' />
            <LoginTextField
              onChange={setChatroom}
              inputName='password'
              type='password'
            />
            <LoginTextField
              onChange={setUsername}
              inputName='email'
              type='email'
            />
            <Box sx={{ mt: 2 }}>
              <Button
                type='submit'
                variant='contained'
                fullWidth
                sx={standardButtonStyle}
              >
                <Typography fontWeight='500' letterSpacing={0.5}>
                  Confirm
                </Typography>
              </Button>
            </Box>
            <Box
              sx={{ cursor: "pointer", paddingTop: "4px" }}
              onClick={() => setShowRegisterForm((prev) => !prev)} //todo : change render logic
            >
              <Typography color='primary'>
                Already registered? Sign in
              </Typography>
            </Box>
          </Box>
        </Grid2>
      )}
    </Grid2>
  );

  return (
    <Grid2 container sx={{ padding: "16px" }}>
      <Grid2 size={12} sx={{ display: "flex", justifyContent: "center" }}>
        <MessageIcon width='200' height='200' currentColor='#8D51E1' />
      </Grid2>
      <Grid2 size={12}>{signInComponent}</Grid2>
    </Grid2>
  );
};

export default Login;
