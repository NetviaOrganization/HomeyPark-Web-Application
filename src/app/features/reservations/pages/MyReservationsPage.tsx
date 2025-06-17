import BasePage from '@/shared/page/BasePage'
import ReservationTabs from '../components/ReservationTabs'
import { useEffect } from 'react'
import ReservationService from '../services/reservationService'
import { useAppStore } from '@/app/store/store'

const reservationService = new ReservationService()

const MyReservationsPage = () => {
  const guestId = useAppStore((state) => state.auth.profileId)

  useEffect(() => {
    if (!guestId) return
    reservationService.getReservationsByGuestId(guestId).then(console.log).catch(console.error)
  }, [guestId])

  return (
    <BasePage>
      <ReservationTabs
        tabHeaders={['En progreso', 'Proximo', 'Pasado']}
        tabContents={[<div>En progreso</div>, <div>Proximo</div>, <div>Pasado</div>]}
      />
    </BasePage>
  )
}

export default MyReservationsPage
