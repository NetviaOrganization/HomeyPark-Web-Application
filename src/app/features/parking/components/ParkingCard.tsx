import { FC } from 'react'
import { Parking } from '../model/parking'
import { env } from '@/env'
import Markdown from 'react-markdown'
import { Button } from 'primereact/button'

const ParkingCard: FC<Props> = ({ parking }) => {
  const { address, numDirection, latitude, longitude, city, street } =
    parking.location
  return (
    <article className="border border-slate-100 rounded-lg overflow-hidden flex flex-col">
      <div className="w-full flex">
        <img
          className="w-full aspect-[16/9]"
          src={`https://maps.googleapis.com/maps/api/streetview?size=600x400&location=${latitude},${longitude}&key=${env.google.apiKey}`}
          alt={`${address} ${numDirection}`}
        />
      </div>

      <div className="p-6">
        <p className="font-medium">
          {address} {numDirection}
        </p>
        <p className="text-sm">
          {street}, {city}
        </p>

        {/* <p className=''></p> */}
        <div className="mt-2 text-xs line-clamp-2">
          <Markdown>{parking.description}</Markdown>
        </div>

        <div className="flex gap-2 mt-auto pt-4">
          <Button
            className="w-full"
            label="Borrar"
            severity="danger"
            size="small"
            icon="pi pi-trash"
          />
          <Button
            className="w-full"
            label="Editar"
            size="small"
            icon="pi pi-pencil"
          />
        </div>
      </div>
    </article>
  )
}

interface Props {
  parking: Parking
}
export default ParkingCard
