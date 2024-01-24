import { useAuth0 } from "@auth0/auth0-react";
export default function LoginButton() {
  const { loginWithPopup, isAuthenticated, isLoading, user } = useAuth0();
  if (isLoading) return <h1>loading ...</h1>;
  if (isAuthenticated) {
    // get user info and so it on the page
    return (
      <div className="center-content">
        <h1>you are logged in</h1>
        <img src={user.picture} alt={user.name} />

        <button onClick={() => loginWithPopup()}>Log Out</button>
      </div>
    );
  }

  return (
    <div className="center-content">
      <button onClick={() => loginWithPopup()}>Log In</button>
    </div>
  );
}
