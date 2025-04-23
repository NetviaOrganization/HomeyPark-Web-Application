import Title from '@/app/shared/components/Title'
import { usePromise } from '@/app/shared/hooks/usePromise'
import BasePage from '@/app/shared/page/BasePage'
import ParkingService from '../services/parkingService'
import { useUser } from '../../auth/context/UserContext'
import ParkingCard from '../components/ParkingCard'
import { createUseStyles } from 'react-jss'
import { useNavigate } from 'react-router'
import { Button } from 'primereact/button'

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
  const navigate = useNavigate()
  const classes = useStyles()

  const { data, loading, error } = usePromise(() =>
    parkingService.getAllByUserId(user!.id!)
  )

  return (
    <BasePage>
      <Title>Mis estacionamientos guardados</Title>

      <div className="flex justify-end">
        <Button
          label="Agregar"
          size="small"
          icon="pi pi-plus"
          onClick={() => navigate('create')}
        />
      </div>

      <div className="mt-6">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error</div>
        ) : data?.length ? (
          <div className={classes.cardList}>
            {data.map((parking) => (
              <ParkingCard
                parking={parking}
                onEdit={() => navigate(`edit/${parking.id}`)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </BasePage>
  )
}

export default MyParkingsPage
