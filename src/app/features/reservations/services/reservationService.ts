import BaseService from '@/shared/services/BaseService'

class ReservationService extends BaseService {
  async getReservationsByGuestId(userId: string) {
    const response = await this.http.get(`/reservations/guest/${userId}`)
    return response.data
  }
}

export default ReservationService
