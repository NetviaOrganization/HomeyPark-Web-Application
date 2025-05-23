import BasePage from '@/shared/page/BasePage'
import { useParkingDetail } from '../hooks/useParkingDetail'
import { useNavigate, useParams } from 'react-router'
import StreetView from '@/shared/components/StreetView'
import { Button } from 'primereact/button'
// import { formatDate } from '@/shared/utils/date'
import Markdown from 'react-markdown'
import { formatCurrency } from '@/shared/utils/money'

const ParkingDetailPage = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  const { parking, loading } = useParkingDetail(id!)

  const handleGoBack = () => navigate(-1)

  return (
    <BasePage>
      {loading ? (
        <h1>Cargando...</h1>
      ) : parking ? (
        <>
          <div className="flex items-center gap-3 mb-4 text-gray-800">
            <Button
              icon="pi pi-arrow-left"
              rounded
              text
              aria-label="Regresar"
              size="small"
              onClick={handleGoBack}
            />
            <h1 className="text-xl">Detalle de garaje</h1>
          </div>
          <div className="relative rounded-lg overflow-hidden">
            <StreetView
              className="w-full h-96 "
              lat={+parking.latitude}
              lng={+parking.longitude}
              disableDefaultUI
              zoomControl={null}
              clickToGo={false}
            />
            <div className="bg-gradient-to-t from-black/60 to-black/10 absolute top-0 left-0 bottom-0 right-0 z-10 flex flex-col justify-end pointer-events-none">
              <div className="text-white p-6 *:pointer-events-auto w-fit">
                <h1 className="text-3xl font-semibold">
                  {parking.address} {parking.numDirection}
                </h1>
                <p>
                  <span>{parking.street}</span>, <span>{parking.city}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-2 gap-4 mt-8">
            <div className="flex flex-col gap-8">
              {/* <div>
                <h3 className="text-gray-800 text-lg font-medium">Propietario</h3>
                <div className="mt-1">
                  <p className="text-sm">
                    <span>{parking.user.name}</span> <span>{parking.user.lastName}</span>
                  </p>
                  <p className="text-sm">
                    Se unió a HomeyPark desde el {formatDate(parking.user.dateCreated)}
                  </p>
                </div>
              </div> */}
              <div>
                <h3 className="text-gray-800 text-lg font-medium">Acerca del servicio</h3>
                <div className="mt-4">
                  <div className="flex gap-8">
                    <div>
                      <i className="pi pi-home text-3xl mx-auto !block w-fit mb-2"></i>
                      <p className="text-sm font-medium">Dimensiones</p>
                      <ul className="text-sm">
                        <li>Largo: {parking.length}m</li>
                        <li>Ancho: {parking.width}m</li>
                        <li>Alto: {parking.height}m</li>
                      </ul>
                    </div>
                    <div>
                      <i className="pi pi-car text-3xl mx-auto !block w-fit mb-2"></i>
                      <p className="text-sm font-medium">Espacios en total</p>
                      <p className="text-sm">Hasta {parking.space} vehículos</p>
                    </div>
                    <div>
                      <i className="pi pi-dollar text-3xl mx-auto !block w-fit mb-2"></i>
                      <p className="text-sm font-medium">Tarifa/Hora</p>
                      <p className="text-sm">{formatCurrency(parking.price)} </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div>
                <h3 className="text-gray-800 text-lg font-medium">Descripción del garaje</h3>
                <div className="mt-1 text-sm">
                  <Markdown>{parking.description}</Markdown>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <h1>No se encontró el parking</h1>
      )}
    </BasePage>
  )
}

export default ParkingDetailPage
