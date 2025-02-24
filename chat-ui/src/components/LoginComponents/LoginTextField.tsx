import { TextField } from "@mui/material";
import { loginTextFieldStyle } from "../../styles/styles";

interface ICustomTextFieldProps {
  inputName: string;
  onChange: (value: string) => void;
  type?: string;
}
const LoginTextField: React.FC<ICustomTextFieldProps> = ({
  inputName,
  onChange,
  type,
}) => (
  <TextField
    id={inputName}
    label={inputName.charAt(0).toUpperCase() + inputName.slice(1)}
    name={inputName}
    type={type ?? "text"}
    required
    fullWidth
    margin='normal'
    onChange={(event) => onChange(event.target.value)}
    sx={loginTextFieldStyle}
  />
);

export default LoginTextField;
