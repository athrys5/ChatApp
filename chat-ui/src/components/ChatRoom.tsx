import {
  Box,
  Grid2,
  Typography,
  useColorScheme,
  useTheme,
} from "@mui/material";
import { IMessage } from "../interfaces/GenericInterfaces";
import MessageContainer from "./MessageContainer";
import SendMessage from "./SendMessage";

interface IChatRoomProps {
  messages: IMessage[];
  sendMessage: (message: string) => Promise<void>;
  username: string;
  chatroom: string;
}

const ChatRoom: React.FC<IChatRoomProps> = ({
  messages,
  sendMessage,
  username,
  chatroom,
}) => {
  const theme = useTheme();
  const { mode, setMode } = useColorScheme();

  return (
    <Grid2 container sx={{ height: "100vh" }}>
      <Grid2
        size={2}
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "secondary.main",
          padding: "16px",
        }}
      >
        <Box
          sx={{
            padding: "6px",
            borderRadius: "5px",
            backgroundColor:
              mode === "light"
                ? theme.palette.secondary.dark
                : theme.palette.secondary.light,
          }}
        >
          <Typography
            color={theme.palette.text.primary}
            fontSize={"0.8rem"}
            sx={{
              letterSpacing: 0.5,
            }}
          >
            ACTIVE USERS - 1
          </Typography>
        </Box>
      </Grid2>
      <Grid2
        size={10}
        sx={{
          padding: "10px 4px 10px 6px",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            marginBottom: "16px",
          }}
        >
          <MessageContainer messages={messages} username={username} />
        </Box>
        <Box
          sx={{
            flexShrink: 0,
          }}
        >
          <SendMessage sendMessage={sendMessage} />
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default ChatRoom;
