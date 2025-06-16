export interface SignUpDTO {
  email: string
  username: string
  password: string
  roles: string[]
}

export interface SignUpResponse extends Omit<SignUpDTO, 'password'> {
  id: number
}

export interface LoginDTO {
  email: string
  password: string
}

export interface LoginResponse {
  id: number
  username: string
  token: string
}
