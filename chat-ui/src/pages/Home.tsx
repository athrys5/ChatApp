import { Outlet } from "react-router";
import AuthorizeView from "../components/LoginComponents/AuthorizeView";

function Home() {
  return (
    <AuthorizeView>
      <Outlet />
    </AuthorizeView>
  );
}

export default Home;
