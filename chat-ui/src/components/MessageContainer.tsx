import { Box, useTheme } from "@mui/material";
import { IMessage } from "../interfaces/GenericInterfaces";

interface IMessageContainerProps {
  messages: IMessage[];
  username: string;
}

const MessageContainer: React.FC<IMessageContainerProps> = ({
  messages,
  username,
}) => {
  const theme = useTheme();
  return (
    <Box>
      {messages.map((msg, index) => {
        return (
          <Box
            key={index}
            sx={{
              display: "flex",
              flex: 1,
              backgroundColor: theme.palette.primary.main,
              height: "3rem",
              borderRadius: "1.5rem",
              padding: "10px",
              margin: "10px",
              minWidth: "15rem",
              maxWidth: "30rem",
              justifySelf:
                username === msg.username ? "flex-end" : "flex-start",
            }}
          >
            {msg.msg} - {msg.username}
          </Box>
        );
      })}
    </Box>
  );
};

export default MessageContainer;
