import BaseService from '@/app/shared/services/BaseService'
import { Parking } from '../model/parking'

class ParkingService extends BaseService<Parking> {
  constructor() {
    super()
    this.baseUrl = `${this.baseUrl}/parking`
  }
}

export default ParkingService
