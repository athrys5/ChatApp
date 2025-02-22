import { Box, Grid2 } from "@mui/material";
import { useState } from "react";

interface ISendMessageProps {
  sendMessage: (message: string) => Promise<void>;
}

const SendMessage: React.FC<ISendMessageProps> = ({ sendMessage }) => {
  const [msg, setMsg] = useState<string>("");

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(msg);
    setMsg("");
  };

  //onChange={(e) => setMsg(e.target.value)}
  return (
    <Box component='form' onSubmit={handleSubmitForm}>
      <Grid2 container sx={{ padding: "8px" }}></Grid2>
    </Box>
  );
};

export default SendMessage;
