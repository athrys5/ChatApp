import { Box, Button, Grow, Grid2, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import LoginTextField from "../components/LoginComponents/LoginTextField";
import { standardButtonStyle } from "../styles/styles";
import MessageIcon from "../icons/MessageIcon";
import { useNavigate } from "react-router";
import { loginUser } from "../services/AuthService";

interface ILoginProps {
  joinChatRoom: (username: string, chatroom: string) => Promise<void>;
  username: string;
  chatroom: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setChatroom: React.Dispatch<React.SetStateAction<string>>;
}

function Login() {
  const navigate = useNavigate();

  const theme = useTheme();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await loginUser(email, password);
      console.log("Login successful:", response);
      navigate("/");
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
          {/*           <LoginTextField onChange={} inputName='chatroom' />
           */}
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
            onClick={() => {}} //todo : change render logic
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
