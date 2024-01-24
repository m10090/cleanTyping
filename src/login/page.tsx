import { useAuth0 } from "@auth0/auth0-react";
export default function LoginButton() {
  const { loginWithPopup } = useAuth0();
  return <button onClick={() => loginWithPopup()}>Log In</button>;
}
