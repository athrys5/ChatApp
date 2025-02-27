import { useNavigate } from "react-router";
import { CLIENT_PAGES_PATH } from "../costants/ClientRoutes";

export default function useNavigateCustom() {
  const navigate = useNavigate();

  const navigateToHome = () => navigate(CLIENT_PAGES_PATH.Home);

  const navigateToLogin = () => navigate(CLIENT_PAGES_PATH.Login);

  const navigateToRegister = () => navigate(CLIENT_PAGES_PATH.Register);

  return {
    navigateToHome,
    navigateToLogin,
    navigateToRegister,
  };
}
