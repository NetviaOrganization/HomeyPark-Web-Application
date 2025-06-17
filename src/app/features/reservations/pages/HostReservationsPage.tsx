import BasePage from '@/shared/page/BasePage'
import ReservationTabs from '../components/ReservationTabs'
import { useEffect, useState } from 'react'
import ReservationService from '../services/reservationService'
import { useAppStore } from '@/app/store/store'
import { Reservation } from '../model/reservation'
import ReservationSummary from '../components/ReservationSummary'
import { useNavigate } from 'react-router'

const reservationService = new ReservationService()

const HostReservationsPage = () => {
  const hostId = useAppStore((state) => state.auth.profileId)
  const [reservations, setReservations] = useState<Reservation[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    if (!hostId) return

    const fetchReservations = async () => {
      try {
        const reservations = await reservationService.getReservationsByHostId(hostId)
        setReservations(reservations)
      } catch (err) {
        console.error('Error fetching reservations:', err)
      }
    }

    fetchReservations()
  }, [hostId])

  const pendingReservations = reservations.filter((reservation) => reservation.status === 'Pending')

  const inProgressReservations = reservations.filter(
    (reservation) => reservation.status === 'InProgress'
  )
  const incomingReservations = reservations.filter(
    (reservation) => reservation.status === 'Approved'
  )

  const pastReservations = reservations.filter((reservation) => reservation.status === 'Completed')

  const renderReservationSummaries = (reservations: Reservation[]) => {
    if (reservations.length === 0) {
      return <p className="text-center text-gray-500">No hay reservas para mostrar</p>
    }

    return (
      <div className="grid grid-cols-3 gap-4">
        {reservations.map((reservation) => (
          <ReservationSummary
            key={reservation.id}
            reservation={reservation}
            onClickCard={() => {
              navigate(`/reservations/${reservation.id}`)
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <BasePage>
      <ReservationTabs
        tabHeaders={['Por aceptar', 'En progreso', 'Proximo', 'Pasado']}
        tabContents={[
          renderReservationSummaries(pendingReservations),
          renderReservationSummaries(inProgressReservations),
          renderReservationSummaries(incomingReservations),
          renderReservationSummaries(pastReservations),
        ]}
      />
    </BasePage>
  )
}

export default HostReservationsPage
