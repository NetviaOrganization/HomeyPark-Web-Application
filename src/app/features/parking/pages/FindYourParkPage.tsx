import BasePage from '@/app/shared/page/BasePage'
import { Map, Marker } from '@vis.gl/react-google-maps'
import { useGeolocation } from '../../../shared/hooks/useGeolocation'
import { usePromise } from '@/app/shared/hooks/usePromise'
import ParkingService from '../services/ParkingService'
import { useNavigate } from 'react-router'

const DEFAULT_LOCATION = {
  latitude: -12.092446,
  longitude: -77.0167209,
}

const parkingService = new ParkingService()

const FindYourParkPage = () => {
  const { latitude, longitude, loading, error } = useGeolocation()
  const { data: parkingList, loading: parkingLoading } = usePromise(
    parkingService.getAll()
  )
  const navigate = useNavigate()

  const handleGoToDetail = (parkingId: number) => {
    navigate(`/find-your-parking/${parkingId}`)
  }

  return (
    <BasePage>
      {!loading && (
        <Map
          className="w-full h-full"
          defaultCenter={{
            lat: latitude ?? DEFAULT_LOCATION.latitude,
            lng: longitude ?? DEFAULT_LOCATION.longitude,
          }}
          defaultZoom={15}
          gestureHandling="greedy"
          disableDefaultUI
        >
          {!error && (
            <Marker
              position={{ lat: latitude!, lng: longitude! }}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: '#00FF00',
                fillOpacity: 1,
                strokeColor: '#008800',
                strokeWeight: 2,
                scale: 8,
              }}
            />
          )}

          {!parkingLoading &&
            parkingList?.map((parking) => (
              <Marker
                position={{
                  lat: parking.location.latitude,
                  lng: parking.location.longitude,
                }}
                onClick={() => handleGoToDetail(parking.id)}
              />
            ))}
        </Map>
      )}
    </BasePage>
  )
}

export default FindYourParkPage
