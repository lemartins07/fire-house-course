import { ParsedToken, User } from 'firebase/auth'

export interface AuthContextType {
  currentUser: User | null
  logout: () => Promise<void>
  loginWithGoogle: () => Promise<void>
  customClaims: ParsedToken | null
}
