import BaseService from '@/shared/services/BaseService'
import { Vehicle } from '../model/vehicle'

export default class VehicleService extends BaseService<Vehicle> {
  constructor() {
    super()
    this.baseUrl = `${this.baseUrl}/vehicles`
  }

  public async getAllByUserId(userId: string | number) {
    try {
      const response = await this.http.get<Vehicle[]>(`${this.baseUrl}/user/${userId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error
    }
  }

  public async deleteById(id: string | number) {
    try {
      const response = await this.http.delete(`${this.baseUrl}/delete/${id}`)
      return response.data
    } catch (error) {
      console.error('Error deleting vehicle:', error)
      throw error
    }
  }
}
