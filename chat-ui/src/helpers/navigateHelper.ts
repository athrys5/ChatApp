import { generatePath, useNavigate } from "react-router";
import { CLIENT_PAGES_PATH } from "../costants/ClientRoutes";

export default function useNavigateCustom() {
  const navigate = useNavigate();

  const navigateToHome = () => navigate(CLIENT_PAGES_PATH.Home);

  const navigateToLogin = () => navigate(CLIENT_PAGES_PATH.Login);

  const navigateToRegister = () => navigate(CLIENT_PAGES_PATH.Register);

  const navigateToChatroom = (id: number) =>
    navigate(generatePath(CLIENT_PAGES_PATH.Chatroom, { id: id }));

  return {
    navigateToHome,
    navigateToLogin,
    navigateToRegister,
    navigateToChatroom,
  };
}
