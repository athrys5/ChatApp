import {
  Button,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
} from "@mui/material";
import { useState } from "react";

interface ISendMessageProps {
  sendMessage: any;
}

const SendMessage: React.FC<ISendMessageProps> = ({ sendMessage }) => {
  const [msg, setMsg] = useState<string>("");

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(msg);
    setMsg("");
  };
  return (
    <div>
      <form onSubmit={(e) => handleSubmitForm(e)}>
        <FormControl component='fieldset'>
          <div className='d-flex-c'>
            <FormGroup>
              <FormControl>
                <InputLabel htmlFor='username-input'>
                  Write message here
                </InputLabel>
                <Input
                  id='msg-input'
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                />
              </FormControl>

              <Button type='submit'>Submit</Button>
            </FormGroup>
          </div>
        </FormControl>
      </form>
    </div>
  );
};

export default SendMessage;
