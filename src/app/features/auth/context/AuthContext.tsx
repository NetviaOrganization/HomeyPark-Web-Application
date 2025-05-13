import useLocalStorage from '@/shared/hooks/useLocalStorage'
import { createContext, useContext, ReactNode, useEffect, useState } from 'react'
import AuthService from '../services/authService'
import { Nullable } from 'primereact/ts-helpers'
import { ROLE_ADMIN } from '../constants/userRole'
import { Profile } from '../model/profile'

interface UserContextType {
  profile: Nullable<Profile>
  isAuthenticated: boolean
  logout: () => void
  login: (username: string, password: string) => Promise<void>
  signUp: (
    email: string,
    username: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<void>
  authToken: Nullable<string>
  authUser: Nullable<AuthUser>
  loading?: boolean
}

interface AuthUser {
  id: number
  username: string
}

const AuthContext = createContext<UserContextType | undefined>(undefined)

const authService = new AuthService()

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authToken, setAuthToken] = useLocalStorage<Nullable<string>>('authToken', null)
  const [profile, setProfile] = useState<Nullable<Profile>>(null)
  const [authUser, setAuthUser] = useLocalStorage<Nullable<AuthUser>>('authUser', null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initialFetchProfile = async () => {
      try {
        setLoading(true)
        if (!authToken) return
        if (!authUser) return

        const profile = await authService.getProfileByUserId(authUser.id)

        if (!profile) throw new Error('Profile not found')

        setProfile(profile)
      } catch (err) {
        console.error('Error fetching profile:', err)
      } finally {
        setLoading(false)
      }
    }

    initialFetchProfile()
  }, [authUser, authToken])

  const logout = () => {
    setAuthToken(null)
    setAuthUser(null)
  }

  const login = async (username: string, password: string) => {
    const { id, token } = await authService.login({ username, password })

    setAuthToken(token)
    setAuthUser({ id, username })
  }

  const signUp = async (
    email: string,
    username: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    const { id: userId } = await authService.signUp({
      email,
      password,
      roles: [ROLE_ADMIN],
      username,
    })

    await login(username, password)

    await authService.createProfile({
      address: 'string',
      name: firstName,
      lastName,
      userId,
    })
  }

  const value: UserContextType = {
    profile,
    authUser,
    isAuthenticated: !!authToken,
    logout,
    signUp,
    authToken,
    login,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
