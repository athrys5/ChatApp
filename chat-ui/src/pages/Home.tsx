import AuthorizeView, {
  AuthorizedUser,
} from "../components/LoginComponents/AuthorizeView";
import LogoutLink from "../components/LoginComponents/Logout";

export default function Home() {
  return (
    <AuthorizeView>
      <span>
        <LogoutLink>
          Logout <AuthorizedUser value='email' />
        </LogoutLink>
      </span>
    </AuthorizeView>
  );
}
