'use client'

import { useAuth } from '@/context/auth'
import { Button } from './button'

export default function GoogleLoginButton() {
  const auth = useAuth()

  const handleLogin = () => {
    auth?.loginWithGoogle()
  }

  return (
    <Button onClick={handleLogin} className="w-full">
      Sign in with Google
    </Button>
  )
}
