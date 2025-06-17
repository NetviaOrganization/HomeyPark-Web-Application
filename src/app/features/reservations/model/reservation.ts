export interface CreateReservationDto {
  hoursRegistered: number
  totalFare: number
  reservationDate: string
  startTime: string
  endTime: string
  guestId: number
  hostId: number
  parkingId: number
  vehicleId: number
}
