import { Box, Button, Grid2, Grow, Typography, useTheme } from "@mui/material";
import MessageIcon from "../icons/MessageIcon";
import LoginTextField from "../components/LoginComponents/LoginTextField";
import { standardButtonStyle } from "../styles/styles";
import { useState } from "react";
import { useNavigate } from "react-router";

function Register() {
  const theme = useTheme();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const registerComponent = (
    <Grid2 size={{ xs: 8, md: 4, lg: 3, xl: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant='h3' fontWeight='500'>
          Register
        </Typography>
      </Box>
      <Box component='form' onSubmit={handleRegister} sx={{ mt: 1 }}>
        <LoginTextField onChange={setEmail} inputName='email' />
        <LoginTextField
          onChange={setPassword}
          inputName='password'
          type='password'
        />
        {/*  <LoginTextField
          onChange={setConfirmPassword}
          inputName='password'
          type='password'
        /> */}
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
        <Box sx={{ cursor: "pointer", paddingTop: "4px" }} onClick={() => {}}>
          <Typography color='primary'>Already registered? Sign in</Typography>
        </Box>
      </Box>
    </Grid2>
  );

  return (
    <Grid2 container>
      <Grid2 size={12} sx={{ display: "flex", justifyContent: "center" }}>
        <MessageIcon
          width='200'
          height='200'
          currentColor={theme.palette.primary.main}
        />
      </Grid2>
      <Grid2 size={12} sx={{ display: "flex", justifyContent: "center" }}>
        {registerComponent}
      </Grid2>
    </Grid2>
  );
}

export default Register;
