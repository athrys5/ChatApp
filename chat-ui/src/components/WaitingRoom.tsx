import {
  Button,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
} from "@mui/material";
import { useState } from "react";

interface IWaitingRoomProps {
  joinChatRoom: (username: string, chatroom: string) => Promise<void>;
}

const WaitingRoom: React.FC<IWaitingRoomProps> = ({ joinChatRoom }) => {
  const [username, setUsername] = useState<string>("");
  const [chatroom, setChatroom] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Previeni il ricaricamento della pagina
    joinChatRoom(username, chatroom);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl component='fieldset'>
        <div className='d-flex-c'>
          <FormGroup>
            <FormControl>
              <InputLabel htmlFor='username-input'>Username</InputLabel>
              <Input
                id='username-input'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor='chatroom-input'>Chatroom</InputLabel>
              <Input
                id='chatroom-input'
                value={chatroom}
                onChange={(e) => setChatroom(e.target.value)}
              />
            </FormControl>
            <Button type='submit'>Submit</Button>
          </FormGroup>
        </div>
      </FormControl>
    </form>
  );
};

export default WaitingRoom;
