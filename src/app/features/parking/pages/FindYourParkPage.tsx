import BasePage from '@/app/shared/page/BasePage'
import { Map, Marker, useMap } from '@vis.gl/react-google-maps'
import { useGeolocation } from '../../../shared/hooks/useGeolocation'
import { usePromise } from '@/app/shared/hooks/usePromise'
import ParkingService from '../services/ParkingService'
import { useNavigate } from 'react-router'
import AutocompleteAddress from '@/app/shared/components/AutocompleteAddress'
import Title from '@/app/shared/components/Title'
import { Fragment } from 'react/jsx-runtime'
import NearbyParkings from '../components/NearbyParkings'
import { useEffect } from 'react'

const DEFAULT_LOCATION = {
  latitude: -12.092446,
  longitude: -77.0167209,
}

const parkingService = new ParkingService()

const FindYourParkPage = () => {
  const navigate = useNavigate()
  const { latitude, longitude, loading, error } = useGeolocation()
  const map = useMap('find-park-map')

  const { data: parkingList, loading: parkingLoading } = usePromise(() =>
    parkingService.getAll()
  )

  useEffect(() => {
    if (latitude && longitude) {
      map?.setCenter({ lat: latitude, lng: longitude })
      map?.setZoom(15)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latitude, longitude])

  const handleGoToDetail = (parkingId: number) => {
    navigate(`/find-your-parking/${parkingId}`)
  }

  const handleChangedPlace = (place: google.maps.places.PlaceResult) => {
    if (place.geometry?.location) {
      const lat = place.geometry.location.lat()
      const lng = place.geometry.location.lng()

      map?.setCenter({ lat, lng })
      map?.setZoom(15)
    }
  }

  return (
    <BasePage>
      <div className="mb-6">
        <Title className="mb-4">Encuentra tu garage</Title>
        <AutocompleteAddress onChangedPlace={handleChangedPlace} />
      </div>
      <div className="w-full h-full relative">
        <Fragment>
          <Map
            id="find-park-map"
            className="w-full h-full rounded-lg overflow-hidden"
            defaultCenter={{
              lat: latitude ?? DEFAULT_LOCATION.latitude,
              lng: longitude ?? DEFAULT_LOCATION.longitude,
            }}
            defaultZoom={15}
            gestureHandling="greedy"
            disableDefaultUI
          >
            {!loading && !error && (
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
                  key={parking.id}
                  position={{
                    lat: parking.location.latitude,
                    lng: parking.location.longitude,
                  }}
                  onClick={() => handleGoToDetail(parking.id)}
                />
              ))}
          </Map>
          {!loading && !error && (
            <NearbyParkings lat={latitude!} lng={longitude!} />
          )}
        </Fragment>
      </div>
    </BasePage>
  )
}

export default FindYourParkPage
