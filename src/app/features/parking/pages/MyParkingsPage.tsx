import Title from '@/shared/components/Title'
import { usePromise } from '@/shared/hooks/usePromise'
import BasePage from '@/shared/page/BasePage'
import ParkingService from '../services/parkingService'
import { useAuth } from '../../auth/context/UserContext'
import ParkingCard from '../components/ParkingCard'
import { createUseStyles } from 'react-jss'
import { useNavigate } from 'react-router'
import { Button } from 'primereact/button'
import { useEffect, useRef, useState } from 'react'
import { Parking } from '../model/parking'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { Toast } from 'primereact/toast'

const parkingService = new ParkingService()

const useStyles = createUseStyles({
  cardList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '16px',
  },
})

const MyParkingsPage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const classes = useStyles()

  const [parkingList, setParkingList] = useState<Parking[]>([])
  const toast = useRef<Toast>(null)

  const { data, loading, error } = usePromise(() => parkingService.getAllByUserId(user!.id!))

  useEffect(() => {
    setParkingList(data || [])
  }, [data])

  const handleDeleteParking = (id: string | number) => {
    return new Promise<void>((resolve, reject) => {
      confirmDialog({
        message: '¿Estás seguro de que deseas eliminar este estacionamiento?',
        header: 'Confirmar eliminación',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {
          try {
            await parkingService.deleteParkingById(id)
            setParkingList((prev) => prev.filter((parking) => parking.id !== id))

            resolve()
            toast.current?.show({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Estacionamiento eliminado correctamente',
            })
          } catch (error) {
            console.error('Error deleting parking:', error)
            reject(error)
          }
        },
        reject: () => {
          resolve()
        },
      })
    })
  }

  return (
    <BasePage>
      <Title>Mis estacionamientos guardados</Title>

      <div className="flex justify-end">
        <Button label="Agregar" size="small" icon="pi pi-plus" onClick={() => navigate('create')} />
      </div>

      <div className="mt-6">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error</div>
        ) : data?.length ? (
          <div className={classes.cardList}>
            {parkingList.map((parking) => (
              <ParkingCard
                key={parking.id}
                parking={parking}
                onEdit={() => navigate(`edit/${parking.id}`)}
                onDelete={() => handleDeleteParking(parking.id)}
              />
            ))}
          </div>
        ) : null}
      </div>

      <ConfirmDialog />
      <Toast ref={toast} />
    </BasePage>
  )
}

export default MyParkingsPage
