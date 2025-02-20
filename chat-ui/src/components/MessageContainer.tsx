import { IMessage } from "../interfaces/GenericInterfaces";

interface IMessageContainerProps {
  messages: IMessage[];
}

const MessageContainer: React.FC<IMessageContainerProps> = ({ messages }) => {
  console.log(messages);
  return (
    <div>
      {messages.map((msg, index) => {
        return (
          <table>
            <tr key={index}>
              <td>
                {msg.msg} - {msg.username}
              </td>
            </tr>
          </table>
        );
      })}
    </div>
  );
};

export default MessageContainer;
