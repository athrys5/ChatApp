import theme from "../themes/theme";

//costants
export const standardBorderRadius = "10px";

//styles
export const loginTextFieldStyle = {
  ".MuiOutlinedInput-root": {
    borderRadius: standardBorderRadius,
  },
  "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },
  "&:hover .MuiInputLabel-root": {
    color: theme.palette.primary.main,
  },
};

export const standardButtonStyle = {
  height: "3.5rem",
  borderRadius: standardBorderRadius,
};
