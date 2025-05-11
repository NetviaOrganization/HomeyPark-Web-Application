import { env } from '@/env'
import { CreateProfileDTO } from '../model/user'
import type { SignUpDTO, SignUpResponse, LoginDTO, LoginResponse } from '../model/auth'
import BaseService from '@/shared/services/BaseService'

class AuthService extends BaseService {
  protected authUrl: string
  protected profileUrl: string

  constructor() {
    super()
    this.authUrl = `${env.api.baseUrl}/authentication`
    this.profileUrl = `${env.api.baseUrl}/profiles`
  }

  public async login(dto: LoginDTO) {
    const response = await this.http.post<LoginResponse>(`${this.authUrl}/sign-in`, dto)
    return response.data
  }

  public async signUp(dto: SignUpDTO) {
    const response = await this.http.post<SignUpResponse>(`${this.authUrl}/sign-up`, dto)
    return response.data
  }

  public async createProfile(dto: CreateProfileDTO): Promise<void> {
    await this.http.post<CreateProfileDTO>(`${this.profileUrl}`, dto)
  }
}

export default AuthService
