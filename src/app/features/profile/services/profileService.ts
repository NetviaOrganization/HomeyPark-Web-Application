/* eslint-disable @typescript-eslint/no-explicit-any */
import BaseService from '@/shared/services/BaseService'
import { Profile } from '../model/profile'

class ProfileService extends BaseService {
  public async getProfileById(id: string | number): Promise<any> {
    try {
      const response = await this.http.get<Profile>(`${this.baseUrl}/profiles/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching profile:', error)
      throw error
    }
  }

  public async updateProfile(data: any): Promise<any> {
    try {
      const response = await this.http.put(`${this.baseUrl}`, data)
      return response.data
    } catch (error) {
      console.error('Error updating profile:', error)
      throw error
    }
  }
}

export default ProfileService
