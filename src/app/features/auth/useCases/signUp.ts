import { ROLE_ADMIN } from '../constants/userRole'
import AuthService from '../services/authService'
import { login } from './login'

const authService = new AuthService()

export const signUp = async (
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  birthDate: Date
) => {
  try {
    await authService.signUp({
      email,
      password,
      firstName,
      lastName,
      birthDate: birthDate.toISOString(),
      roles: [ROLE_ADMIN],
    })
    await login(email, password)
  } catch (error) {
    console.error('Error during sign up:', error)
    throw error
  }
}
