import { usePromise } from '@/app/shared/hooks/usePromise'
import ParkingService from '../services/ParkingService'
import { FC } from 'react'
import ParkingSummary from './ParkingSummary'
import { useNavigate } from 'react-router'

const parkingService = new ParkingService()

const NearbyParkings: FC<Props> = ({ lat, lng }) => {
  const navigate = useNavigate()
  const { data, loading, error } = usePromise(
    parkingService.getNearbyByLocation(lat, lng)
  )

  if (loading || error || !data?.length) return null

  return (
    <>
      <div className="absolute z-10 bg-white rounded-lg shadow-lg left-4 right-4 bottom-4 p-6 grid grid-cols-3">
        {data.map((parking) => (
          <ParkingSummary
            key={parking.id}
            parking={parking}
            onClick={() => navigate(`/find-your-parking/${parking.id}`)}
          />
        ))}
      </div>
    </>
  )
}

interface Props {
  lat: number
  lng: number
}

export default NearbyParkings
