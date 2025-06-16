import AuthService from '@/app/features/auth/services/authService'
import { appStore } from '@/app/store/store'

const authService = new AuthService()

export const login = async (email: string, password: string) => {
  const { setState: set } = appStore

  const { token } = await authService.login({ email, password })

  set((state) => {
    state.auth.token = token
  })
}
