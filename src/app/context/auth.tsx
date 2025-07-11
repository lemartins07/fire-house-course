'use client'

import { AuthContextType } from "@/types/auth";
import { User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/app/lib/firebase/client";

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user ?? null)
    })

    return () => unsubscribe()
  }, [])

  return <AuthContext.Provider value={{
    currentUser,
  }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)