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
            <Link
              href="/login"
              className="uppercase tracking-wider hover:underline"
            >
              Login
            </Link>
          </li>
          <li className="h-8 w-[1px] bg-white/50"></li>
          <li>
            <Link
              href="/register"
              className="uppercase tracking-wider hover:underline"
            >
              Sing Up
            </Link>
          </li>
        </>
      )}
    </>
  )
}
