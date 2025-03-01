import Chatroom from "../pages/ChatRoom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

const CLIENT_PAGES = {
  Login: {
    path: "login",
  },
  Chatroom: {
    path: "chatroom",
  },
  Register: {
    path: "register",
  },
};

const CLIENT_PATH_PARAMETERS = { Id: "/:id" };

export const CLIENT_PAGES_PATH = {
  Home: "/",
  Login: `/${CLIENT_PAGES.Login.path}`,
  Chatroom: `/${CLIENT_PAGES.Chatroom.path}${CLIENT_PATH_PARAMETERS.Id}`,
  Register: `/${CLIENT_PAGES.Register.path}`,
};

export const CLIENT_ROUTES = [
  {
    path: CLIENT_PAGES_PATH.Home,
    element: <Home />,
  },
  {
    path: CLIENT_PAGES_PATH.Login,
    element: <Login />,
  },
  {
    path: CLIENT_PAGES_PATH.Register,
    element: <Register />,
  },
  {
    path: CLIENT_PAGES_PATH.Chatroom,
    element: <Chatroom />,
  },
];
