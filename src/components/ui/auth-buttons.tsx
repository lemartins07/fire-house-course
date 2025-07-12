'use client'

import { useAuth } from '@/context/auth'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu'
import { Avatar, AvatarFallback } from './avatar'
import Image from 'next/image'

export function AuthButtons() {
  const auth = useAuth()

  const handleLogout = async () => {
    await auth?.logout()
  }
  return (
    <>
      {!!auth?.currentUser && (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              {!!auth.currentUser.photoURL && (
                <Image
                  src={auth.currentUser.photoURL}
                  alt={auth.currentUser.displayName || 'User Avatar'}
                  width={70}
                  height={70}
                ></Image>
              )}
              <AvatarFallback>
                {(auth.currentUser.displayName || auth.currentUser.email)?.[0]}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-sky-950 text-white border-sky-950">
            <DropdownMenuLabel>
              <div>{auth.currentUser.displayName}</div>
              <div className="text-xs font-normal">
                {auth.currentUser.email}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="opacity-50" />
            <DropdownMenuItem asChild>
              <Link href="/my-account">My Account</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/admin-dashboard">Admin Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/my-favourite">My Favourite</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => auth.logout()}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
          <li onClick={handleLogout}>Logout</li>
        </DropdownMenu>
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
