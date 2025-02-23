import { Box, Grid2, useTheme } from "@mui/material";
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
        const showIconAndUsername =
          index === 0 || messages[index - 1].username !== msg.username;

        return (
          <Box key={index}>
            {index > 0 && messages[index - 1].username !== msg.username ? (
              <Box
                sx={{
                  height: "1px",
                  backgroundColor: theme.palette.secondary.main,
                  margin: "8px",
                }}
              ></Box>
            ) : null}

            <Grid2 container spacing={0}>
              <Grid2 size={1}>
                {showIconAndUsername && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: "2.5rem",
                        height: "2.5rem",
                        borderRadius: "50%",

                        backgroundColor: theme.palette.secondary.main,
                      }}
                    />
                  </Box>
                )}
              </Grid2>
              <Grid2 size={11}>
                {showIconAndUsername && (
                  <Box sx={{ fontWeight: "bold" }}>{msg.username}</Box>
                )}
                <Box
                  sx={{
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                  }}
                >
                  {msg.msg}
                </Box>
              </Grid2>
            </Grid2>
          </Box>
        );
      })}
    </Box>
  );
};

export default MessageContainer;
