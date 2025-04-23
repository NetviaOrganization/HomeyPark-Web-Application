import useLocalStorage from '@/app/shared/hooks/useLocalStorage'
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react'

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
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [storedUser, setStoredUser] = useLocalStorage<User | null>(
    'authUser',
    null
  )

  useEffect(() => {
    if (storedUser) {
      setUser(storedUser)
    }
  }, [storedUser])

  const handleSetUser = (newUser: User | null) => {
    setUser(newUser)
    setStoredUser(newUser)
  }

  const value = {
    user,
    setUser: handleSetUser,
    isAuthenticated: !!user,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
