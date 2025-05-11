import useLocalStorage from '@/shared/hooks/useLocalStorage'
import { createContext, useContext, ReactNode } from 'react'
import AuthService from '../services/authService'
import { Nullable } from 'primereact/ts-helpers'

interface User {
  id?: number
  email?: string
  name?: string
  // Add more user properties as needed
}

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  isAuthenticated: boolean
  logout: () => void
  login: (username: string, password: string) => Promise<void>
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>
  authToken: Nullable<string>
}

const AuthContext = createContext<UserContextType | undefined>(undefined)

const authService = new AuthService()

export function AuthProvider({ children }: { children: ReactNode }) {
  // const [user, setStoredUser] = useLocalStorage<User | null>('authUser', null)
  const [authToken, setAuthToken] = useLocalStorage<Nullable<string>>('authToken', null)
  // const [user, setUser] = useState<User | null>(user)

  const handleSetUser = () => {
    // setUser(newUser)
    // setStoredUser(newUser)
  }

  const logout = () => {
    setAuthToken(null)
    // setUser(null)
    // setStoredUser(null)
  }

  const login = async (username: string, password: string) => {
    const { token } = await authService.login({ username, password })

    console.log('Token:', token)

    setAuthToken(token)
  }

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    const username = `${firstName} ${lastName}`

    const { id: userId } = await authService.signUp({
      email,
      password,
      roles: ['ROLE_ADMIN'],
      username: `${firstName} ${lastName}`,
    })

    await login(username, password)

    await authService.createProfile({
      address: 'string',
      name: firstName,
      lastName,
      userId,
    })
  }

  const value = {
    user: null,
    setUser: handleSetUser,
    isAuthenticated: !!authToken,
    logout,
    signUp,
    authToken,
    login,
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
