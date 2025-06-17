import BasePage from '@/shared/page/BasePage'
import ReservationTabs from '../components/ReservationTabs'
import { useEffect, useState } from 'react'
import ReservationService from '../services/reservationService'
import { useAppStore } from '@/app/store/store'
import { Reservation } from '../model/reservation'
import ReservationSummary from '../components/ReservationSummary'
import { useNavigate } from 'react-router'
import { Button } from 'primereact/button'

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

  const pastReservations = reservations.filter(
    (reservation) => reservation.status === 'Completed' || reservation.status === 'Cancelled'
  )

  const handleCancelReservation = async (id: number) => {
    try {
      await reservationService.cancelReservation(id)
      setReservations((prev) => prev.filter((reservation) => reservation.id !== id))
    } catch (err) {
      console.error('Error canceling reservation:', err)
    }
  }

  const handleApproveReservation = async (id: number) => {
    try {
      await reservationService.approveReservation(id)
      setReservations((prev) =>
        prev.map((reservation) =>
          reservation.id === id ? { ...reservation, status: 'Approved' } : reservation
        )
      )
    } catch (err) {
      console.error('Error approving reservation:', err)
    }
  }

  const handleStartReservation = async (id: number) => {
    try {
      await reservationService.startReservation(id)
      setReservations((prev) =>
        prev.map((reservation) =>
          reservation.id === id ? { ...reservation, status: 'InProgress' } : reservation
        )
      )
    } catch (err) {
      console.error('Error starting reservation:', err)
    }
  }

  const handleCompleteReservation = async (id: number) => {
    try {
      await reservationService.completeReservation(id)
      setReservations((prev) =>
        prev.map((reservation) =>
          reservation.id === id ? { ...reservation, status: 'Completed' } : reservation
        )
      )
    } catch (err) {
      console.error('Error completing reservation:', err)
    }
  }

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
            actions={
              reservation.status === 'Pending' ? (
                <div className="flex gap-2">
                  <Button
                    label="Rechazar"
                    className="w-full"
                    severity="danger"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleCancelReservation(reservation.id)
                    }}
                  />
                  <Button
                    label="Aceptar"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleApproveReservation(reservation.id)
                    }}
                  />
                </div>
              ) : reservation.status === 'Approved' ? (
                <Button
                  label="Iniciar"
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleStartReservation(reservation.id)
                  }}
                />
              ) : reservation.status === 'InProgress' ? (
                <Button
                  label="Completar"
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleCompleteReservation(reservation.id)
                  }}
                />
              ) : null
            }
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
