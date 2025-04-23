import BasePage from '@/app/shared/page/BasePage'
import { useParkingDetail } from '../hooks/useParkingDetail'
import { useParams } from 'react-router'
import StreetView, {
  StreetViewHandle,
} from '@/app/shared/components/StreetView'
import { useRef } from 'react'

const ParkingDetailPage = () => {
  const { id } = useParams()

  const { parking, loading } = useParkingDetail(id!)

  const streetViewRef = useRef<StreetViewHandle | null>(null)

  console.log(streetViewRef.current?.panorama)

  return (
    <BasePage>
      {loading ? (
        <h1>Cargando...</h1>
      ) : parking ? (
        <>
          <h1>Detalles de estacionamiento</h1>
          <StreetView
            className="w-full h-96 rounded-lg"
            ref={streetViewRef}
            lat={parking.location.latitude}
            lng={parking.location.longitude}
            disableDefaultUI
          />
        </>
      ) : (
        <h1>No se encontró el parking</h1>
      )}
    </BasePage>
  )
}

export default ParkingDetailPage
