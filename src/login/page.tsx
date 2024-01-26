import { useAuth0 } from "@auth0/auth0-react";

export default function LoginButton() {
  const { loginWithRedirect, isAuthenticated, user, isLoading, error } =
    useAuth0();

  if (isLoading) {
    // Loading state, you can add a loader or any other indication here
    return <div>Loading...</div>;
  }

  if (error) {
    // Handle authentication error
    return <div>Error: {error.message}</div>;
  }

  if (isAuthenticated) {
    // User is authenticated, display user info and logout button
    return (
      <div className="center-content">
        <h1>Welcome, {user.name}!</h1>
        <img src={user.picture} alt={user.name} />

        <button
          onClick={() =>
            loginWithRedirect()
          }
        >
          Log Out
        </button>
      </div>
    );
  }

  // User is not authenticated, display login button
  return (
    <div className="center-content">
      <button onClick={() => loginWithRedirect()}>Log In</button>
    </div>
  );
}
