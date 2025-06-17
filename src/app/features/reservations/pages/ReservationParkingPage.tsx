import Title from '@/shared/components/Title'
import BasePage from '@/shared/page/BasePage'
import { Calendar } from 'primereact/calendar'
import { Card } from 'primereact/card'
import { Nullable } from 'primereact/ts-helpers'
import { useState } from 'react'

const ReservationParkingPage = () => {
  const [date, setDate] = useState<Nullable<Date>>(null)
  const [startTime, setStartTime] = useState<Nullable<Date>>(null)
  const [endTime, setEndTime] = useState<Nullable<Date>>(null)

  return (
    <BasePage>
      <Title>Checkout</Title>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mt-8 flex flex-col gap-4">
          <Card
            className="shadow-md"
            header={
              <div className="px-6 py-4 border-b border-gray-200">
                <Title level="h4">Horario</Title>
              </div>
            }
          >
            <div className="flex gap-3">
              <div className="flex flex-col gap-1 w-full">
                <label className="text-sm font-semibold">Fecha de reserva</label>
                <Calendar value={date} onChange={(e) => setDate(e.value)} />
              </div>
              <div className="flex gap-3 w-full">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold">Hora de inicio</label>
                  <Calendar value={startTime} onChange={(e) => setStartTime(e.value)} timeOnly />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold">Hora de cierre</label>
                  <Calendar
                    value={endTime}
                    onChange={(e) => setEndTime(e.value)}
                    timeOnly
                    minDate={startTime ? new Date(startTime.getTime() + 30 * 60 * 1000) : undefined}
                  />
                </div>
              </div>
            </div>
          </Card>

          <Card
            className="shadow-md"
            header={
              <div className="px-6 py-4 border-b border-gray-200">
                <Title level="h4">Medio de pago</Title>
              </div>
            }
          >
            {/* <div className="flex gap-3">
              <div className="flex flex-col gap-1 w-full">
                <label className="text-sm font-semibold">Fecha de reserva</label>
                <Calendar value={date} onChange={(e) => setDate(e.value)} />
              </div>
              <div className="flex gap-3 w-full">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold">Hora de inicio</label>
                  <Calendar value={startTime} onChange={(e) => setStartTime(e.value)} timeOnly />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold">Hora de cierre</label>
                  <Calendar
                    value={endTime}
                    onChange={(e) => setEndTime(e.value)}
                    timeOnly
                    minDate={startTime ? new Date(startTime.getTime() + 30 * 60 * 1000) : undefined}
                  />
                </div>
              </div>
            </div> */}
          </Card>

          <Card
            className="shadow-md"
            header={
              <div className="px-6 py-4 border-b border-gray-200">
                <Title level="h4">Vehículo</Title>
              </div>
            }
          ></Card>
        </div>
      </div>
    </BasePage>
  )
}

export default ReservationParkingPage
