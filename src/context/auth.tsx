'use client'

import { AuthContextType } from '@/types/auth'
import {
  GoogleAuthProvider,
  ParsedToken,
  signInWithPopup,
  User,
} from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '@/lib/firebase/client'
import { removeToken, setToken } from './actions'

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [customClaims, setCustomClaims] = useState<ParsedToken | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user ?? null)
      if (user) {
        const tokenResult = await user.getIdTokenResult()
        const token = tokenResult.token
        const refreshToken = user.refreshToken
        const claims = tokenResult.claims

        setCustomClaims(claims ?? null)

        if (token && refreshToken) {
          await setToken({
            token,
            refreshToken,
          })
        }
      } else {
        await removeToken()
      }
    })

    return () => unsubscribe()
  }, [])

  const logout = async () => {
    await auth.signOut()
  }

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        logout,
        loginWithGoogle,
        customClaims,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
