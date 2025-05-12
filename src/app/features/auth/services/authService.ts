import { env } from '@/env'
import type { SignUpDTO, SignUpResponse, LoginDTO, LoginResponse } from '../model/auth'
import BaseService from '@/shared/services/BaseService'
import { InvalidCredentialsError } from '../errors/invalidCredentialsError'
import { UserAlreadyExistsError } from '../errors/emailAlreadyExistsError'
import { Profile, CreateProfileDTO } from '../model/profile'

class AuthService extends BaseService {
  protected authUrl: string
  protected profileUrl: string

  constructor() {
    super()
    this.authUrl = `${env.api.baseUrl}/authentication`
    this.profileUrl = `${env.api.baseUrl}/profiles`
  }

  public async login(dto: LoginDTO) {
    try {
      const response = await this.http.post<LoginResponse>(`${this.authUrl}/sign-in`, dto)
      return response.data
    } catch {
      throw new InvalidCredentialsError('Invalid credentials')
    }
  }

  public async signUp(dto: SignUpDTO) {
    try {
      const response = await this.http.post<SignUpResponse>(`${this.authUrl}/sign-up`, dto)
      return response.data
    } catch {
      throw new UserAlreadyExistsError('Email already exists')
    }
  }

  public async createProfile(dto: CreateProfileDTO): Promise<void> {
    await this.http.post(`${this.profileUrl}`, dto)
  }

  public async getProfileByUserId(userId: number | string) {
    const response = await this.http.get<Profile[]>(`${this.profileUrl}`)
    const profile = response.data.find((profile) => profile.userId === userId)

    return profile ?? null
  }
}

export default AuthService
