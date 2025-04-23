import { env } from '@/env'
import Axios, { AxiosInstance } from 'axios'
import { AuthUser } from '../model/user'

class AuthService {
  protected baseUrl: string
  protected http: AxiosInstance

  constructor() {
    this.baseUrl = `${env.api.baseUrl}/users`

    this.http = Axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
  }

  public async login(email: string, password: string): Promise<AuthUser> {
    try {
      const response = await this.http.get<AuthUser>(
        `${this.baseUrl}/login?email=${email}&password=${password}`
      )
      return response.data
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error
    }
  }

  public async signUp(
    email: string,
    name: string,
    lastName: string,
    password: string
  ): Promise<AuthUser> {
    try {
      const response = await this.http.post<AuthUser>(`${this.baseUrl}`, {
        email,
        name,
        lastName,
        password,
      })
      return response.data
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error
    }
  }
}

export default AuthService
