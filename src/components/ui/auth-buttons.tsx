'use client'

import { useAuth } from "@/app/context/auth"
import Link from "next/link"

export function AuthButtons() {
  const auth = useAuth()

  return (
    <>
      {!!auth?.currentUser && (
        <>
          <li>{auth.currentUser.email}</li>
          <li>Logout</li>
        </>
      )}

      {!auth?.currentUser && (
        <>
          <li><Link href='/login'>Login</Link></li>
          <li><Link href='/register'>Sing Up</Link></li>
        </>
      )}
    </>
  )
}