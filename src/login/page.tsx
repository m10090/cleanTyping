import { useAuth0 } from "@auth0/auth0-react";
export default function LoginButton() {
  const { loginWithRedirect, isAuthenticated, isLoading, user } = useAuth0();
  if (isLoading) return <h1>loading ...</h1>;
  if (isAuthenticated) {
    // get user info and so it on the page
    return (
      <div className="center-content">
        <h1>you are logged in</h1>
        <img src={user.picture} alt={user.name} />

        <button onClick={() => loginWithRedirect()}>Log Out</button>
      </div>
    );
  }

  return (
    <div className="center-content">
      <button onClick={() => loginWithRedirect()}>Log In</button>
    </div>
  );
}
