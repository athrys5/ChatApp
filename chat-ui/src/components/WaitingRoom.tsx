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

  return (
    <FormControl
      component='fieldset'
      onSubmit={(e) => {
        e.preventDefault();
        joinChatRoom(username, chatroom);
      }}
    >
      <div className='d-flex-c'>
        <FormGroup>
          <FormControl>
            <InputLabel htmlFor='my-input'>Username</InputLabel>
            <Input
              id='my-input'
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor='my-input'>Chatroom</InputLabel>
            <Input
              id='my-input'
              onChange={(e) => setChatroom(e.target.value)}
            />
          </FormControl>
          <Button type='submit'> Submit</Button>
        </FormGroup>
      </div>
    </FormControl>
  );
};

export default WaitingRoom;
