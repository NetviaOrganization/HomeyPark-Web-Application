import BasePage from '@/app/shared/page/BasePage'
import { Map, Marker } from '@vis.gl/react-google-maps'
import { useGeolocation } from '../../../shared/hooks/useGeolocation'

const DEFAULT_LOCATION = {
  latitude: -12.092446,
  longitude: -77.0167209,
}

const FindYourParkPage = () => {
  const { latitude, longitude, loading, error } = useGeolocation()

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
          {!error && <Marker position={{ lat: latitude!, lng: longitude! }} />}
        </Map>
      )}
    </BasePage>
  )
}

export default FindYourParkPage
