import { useParams } from "react-router";
import ChatRoom from "../components/ChatRoom";

export default function Chatroom() {
  const { id } = useParams();

  return <ChatRoom />;
}
