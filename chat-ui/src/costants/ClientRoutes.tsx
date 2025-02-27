const CLIENT_PAGES = {
  Login: {
    path: "login",
  },
  Chatroom: {
    path: "chatroom",
  },
};

const CLIENT_PATH_PARAMETERS = { Id: "/:id" };

const CLIENT_PAGES_PATH = {
  Home: "/",
  Login: `/${CLIENT_PAGES.Login.path}`,
  Chatroom: `/${CLIENT_PAGES.Chatroom.path}${CLIENT_PATH_PARAMETERS.Id}`,
};

export const CLIENT_ROUTES = [
  {
    path: "/",
    element: <></>,
    children: [
      { path: CLIENT_PAGES_PATH.Login, element: <></> },
      { path: CLIENT_PAGES_PATH.Chatroom, element: <></> },
    ],
  },
];
