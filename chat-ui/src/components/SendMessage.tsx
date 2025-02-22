import { Box, useColorScheme, useTheme } from "@mui/material";
import { useState } from "react";
import SendIcon from "@mui/icons-material/Send";

interface ISendMessageProps {
  sendMessage: (message: string) => Promise<void>;
}

const SendMessage: React.FC<ISendMessageProps> = ({ sendMessage }) => {
  const theme = useTheme();
  const { mode, setMode } = useColorScheme();

  const [msg, setMsg] = useState<string>("");

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(msg);
    setMsg("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // Prevent default behavior
      e.preventDefault();

      handleSubmitForm(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  return (
    <Box component='form' onSubmit={handleSubmitForm}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          padding: "8px",
          height: "3rem",
          borderRadius: "10px",
          border: "none",
          backgroundColor:
            mode === "light"
              ? theme.palette.secondary.dark
              : theme.palette.secondary.light,
          outline: "none",
          color: theme.palette.text.primary,
          fontFamily: theme.typography.fontFamily,
          fontSize: "1rem",
        }}
      >
        <Box
          component='input'
          placeholder='Write a message here'
          value={msg}
          sx={{
            flex: 1,
            border: "none",
            backgroundColor: "transparent",
            outline: "none",
            color: theme.palette.text.primary,
            fontFamily: theme.typography.fontFamily,
            fontSize: "1rem",
          }}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <SendIcon
          sx={{
            cursor: "pointer",
            marginLeft: "8px",
            color: theme.palette.primary.main,
            "&:hover": {
              color: theme.palette.primary.dark,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default SendMessage;
