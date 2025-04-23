import { env } from '@/env'
import Axios, { type AxiosInstance } from 'axios'

class BaseService<T> {
  protected baseUrl: string
  protected http: AxiosInstance

  constructor() {
    this.baseUrl = env.api.baseUrl

    this.http = Axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })

    console.log(this.http)
  }

  public async getAll(): Promise<T[]> {
    try {
      console.log('DEBUG', this.baseUrl)

      const response = await this.http.get<T[]>(this.baseUrl)
      return response.data
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error
    }
  }
}

export default BaseService
