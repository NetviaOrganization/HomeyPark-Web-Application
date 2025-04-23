import BaseService from '@/app/shared/services/BaseService'
import { Parking } from '../model/parking'

class ParkingService extends BaseService<Parking> {
  constructor() {
    super()
    this.baseUrl = `${this.baseUrl}/parking`
  }

  public override async getById(id: string | number): Promise<Parking> {
    try {
      const response = await this.http.get<Parking>(
        `${this.baseUrl}/${id}/details`
      )
      return response.data
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error
    }
  }

  public async getNearbyByLocation(lat: number, lng: number) {
    try {
      const response = await this.http.get<Parking[]>(
        `${this.baseUrl}/nearby?lat=${lat}&lng=${lng}`
      )
      return response.data
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error
    }
  }

  public async getAllByUserId(userId: string | number) {
    try {
      const response = await this.http.get<Parking[]>(
        `${this.baseUrl}/user/${userId}`
      )
      return response.data
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error
    }
  }
}

export default ParkingService
