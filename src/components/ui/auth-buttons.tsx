'use client'

import { useAuth } from '@/context/auth'
import Link from 'next/link'

export function AuthButtons() {
  const auth = useAuth()

  const handleLogout = async () => {
    await auth?.logout()
  }
  return (
    <>
      {!!auth?.currentUser && (
        <>
          <li>{auth.currentUser.email}</li>
          <li onClick={handleLogout}>Logout</li>
        </>
      )}

      {!auth?.currentUser && (
        <>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/register">Sing Up</Link>
          </li>
        </>
      )}
    </>
  )
}
