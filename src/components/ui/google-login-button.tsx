'use client'

import { useAuth } from '@/context/auth'
import { Button } from './button'
import { useRouter } from 'next/navigation'

export default function GoogleLoginButton() {
  const auth = useAuth()
  const router = useRouter()

  const handleLogin = async () => {
    await auth?.loginWithGoogle()
    router.refresh()
  }

  return (
    <Button onClick={handleLogin} className="w-full">
      Sign in with Google
    </Button>
  )
}
