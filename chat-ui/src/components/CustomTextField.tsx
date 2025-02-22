import { TextField } from "@mui/material";
import { loginTextFieldStyle } from "../styles/styles";

interface ICustomTextFieldProps {
  inputName: string;
  onChange: (value: string) => void;
}
const LoginTextField: React.FC<ICustomTextFieldProps> = ({
  inputName,
  onChange,
}) => (
  <TextField
    id={inputName}
    label={inputName.charAt(0).toUpperCase() + inputName.slice(1)}
    name={inputName}
    required
    fullWidth
    margin='normal'
    onChange={(event) => onChange(event.target.value)}
    sx={loginTextFieldStyle}
  />
);

export default LoginTextField;
