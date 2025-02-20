import { IMessage } from "../interfaces/GenericInterfaces";
import MessageContainer from "./MessageContainer";

interface IChatRoomProps {
  messages: IMessage[];
}

const ChatRoom: React.FC<IChatRoomProps> = ({ messages }) => {
  return (
    <div>
      <div></div>
      ChatRoom
      <div>
        <MessageContainer messages={messages} />
      </div>
    </div>
  );
};

export default ChatRoom;
