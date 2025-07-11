import { auth } from "@/app/lib/firebase/client";
import { Button } from "./button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function GoogleLoginButton() {
  const handleLogin = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
  }

  return (
    <Button onClick={handleLogin}>Sign in with Google</Button>
  )
}