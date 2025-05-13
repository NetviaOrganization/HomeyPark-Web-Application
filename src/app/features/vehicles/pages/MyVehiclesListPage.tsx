import Title from '@/shared/components/Title'
import BasePage from '@/shared/page/BasePage'
import { useVehicles } from '../hooks/useVehicles'
import VehiclesList from '../components/VehiclesList'
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog'
import { Vehicle } from '../model/vehicle'
import { Toast } from 'primereact/toast'
import { useRef, useState } from 'react'

const MyVehiclesListPage = () => {
  const { error, loading, vehicles, deleteVehicle } = useVehicles()
  const [loadingDeleteVehicleId, setLoadingDeleteVehicleId] = useState<string | number | null>(null)
  const toast = useRef<Toast>(null)

  const handleDelete = (vehicle: Vehicle) => {
    confirmDialog({
      message: '¿Estás seguro de que deseas eliminar este vehículo?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',

      accept: async () => {
        try {
          setLoadingDeleteVehicleId(vehicle.id)
          await deleteVehicle(vehicle.id)

          toast.current?.show({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Vehículo eliminado correctamente',
          })
        } catch (error) {
          console.error('Error deleting parking:', error)
          // reject(error)
        } finally {
          setLoadingDeleteVehicleId(null)
        }
      },
    })
  }

  return (
    <BasePage>
      <Title>Mis vehículos</Title>
      <section className="mt-6">
        {loading ? (
          <div></div>
        ) : error ? (
          <div className="text-red-500">Error: {error.message}</div>
        ) : (
          <VehiclesList
            vehicles={vehicles}
            onDelete={handleDelete}
            loadingVehicleDeleteId={loadingDeleteVehicleId}
          />
        )}
      </section>
      <ConfirmDialog />
      <Toast ref={toast} />
    </BasePage>
  )
}

export default MyVehiclesListPage
