'use server'

import { auth } from '@/lib/firebase/server'
import { cookies } from 'next/headers'

type setTokenType = {
  token: string
  refreshToken: string
}

export const removeToken = async () => {
  const cookieStore = await cookies()
  cookieStore.delete('firebaseAuthToken')
  cookieStore.delete('firebaseAuthRefreshToken')
}

export const setToken = async ({ token, refreshToken }: setTokenType) => {
  try {
    const verifiedToken = await auth.verifyIdToken(token)
    if (!verifiedToken) {
      return
    }

    const userRecord = await auth.getUser(verifiedToken.uid)
    if (
      process.env.ADMIN_EMAIL === userRecord.email &&
      !userRecord.customClaims?.admin
    ) {
      auth.setCustomUserClaims(verifiedToken.uid, { admin: true })
    }

    const cookieStore = await cookies()
    cookieStore.set('firebaseAuthToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })

    cookieStore.set('firebaseAuthRefreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })
  } catch (error) {
    console.log(error)
  }
}
