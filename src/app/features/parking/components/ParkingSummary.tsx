import { FC } from 'react'
import { Parking } from '../model/parking'

const ParkingSummary: FC<Props> = ({ parking, onClick }) => {
  return (
    <div className="border rounded-md border-slate-200 p-4 cursor-pointer" onClick={onClick}>
      <p className="text-sm font-semibold">
        {parking.address} {parking.numDirection}
      </p>
      <p className="mt-2 text-sm">
        {parking.street}, {parking.city}
      </p>
    </div>
  )
}

interface Props {
  parking: Parking
  onClick?: () => void
}

export default ParkingSummary
