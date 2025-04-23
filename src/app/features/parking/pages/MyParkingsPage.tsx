import Title from '@/app/shared/components/Title'
import { usePromise } from '@/app/shared/hooks/usePromise'
import BasePage from '@/app/shared/page/BasePage'
import ParkingService from '../services/parkingService'
import { useUser } from '../../auth/context/UserContext'
import ParkingCard from '../components/ParkingCard'
import { createUseStyles } from 'react-jss'

const parkingService = new ParkingService()

const useStyles = createUseStyles({
  cardList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '16px',
  },
})

const MyParkingsPage = () => {
  const { user } = useUser()
  const classes = useStyles()

  const { data, loading, error } = usePromise(() =>
    parkingService.getAllByUserId(user!.id!)
  )

  return (
    <BasePage>
      <Title>Mis estacionamientos guardados</Title>

      <div className="mt-6">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error</div>
        ) : data?.length ? (
          <div className={classes.cardList}>
            {data.map((parking) => (
              <ParkingCard parking={parking} />
            ))}
          </div>
        ) : null}
      </div>
    </BasePage>
  )
}

export default MyParkingsPage
