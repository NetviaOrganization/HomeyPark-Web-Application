import BaseService from '@/shared/services/BaseService'
import { CreateReservationDto, Reservation } from '../model/reservation'

class ReservationService extends BaseService {
  async getReservationsByGuestId(userId: string) {
    const response = await this.http.get<Reservation[]>(`/reservations/guest/${userId}`)
    return response.data
  }

  async createReservation(dto: CreateReservationDto, attachment: File) {
    const formData = new FormData()
    formData.append('file', attachment)
    formData.append('reservation', new Blob([JSON.stringify(dto)], { type: 'application/json' }))

    const response = await this.http.post('/reservations', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    console.log('Reservation created:', response.data)

    return response.data
  }

  async getReservationsByHostId(userId: string) {
    const response = await this.http.get<Reservation[]>(`/reservations/host/${userId}`)
    return response.data
  }
}

export default ReservationService
