import BasePage from '@/shared/page/BasePage'
import { Map, Marker, useApiIsLoaded, useMap } from '@vis.gl/react-google-maps'

import { useNavigate, useParams } from 'react-router'
import { Parking, UpdateParkingDto } from '../model/parking'
import ParkingService from '../services/parkingService'
import { usePromise } from '@/shared/hooks/usePromise'
import { Controller, useForm } from 'react-hook-form'
import Title from '@/shared/components/Title'
import { Divider } from 'primereact/divider'
import { InputNumber } from 'primereact/inputnumber'
import { REQUIRED_INPUT_ERROR } from '@/messages/form'
import AutocompleteAddress from '@/shared/components/AutocompleteAddress'
import { Button } from 'primereact/button'
import { useState } from 'react'
import { useAuth } from '../../auth/context/AuthContext'
import { InputTextarea } from 'primereact/inputtextarea'

const parkingService = new ParkingService()

const DEFAULT_LOCATION = {
  latitude: -12.092446,
  longitude: -77.0167209,
}

const defaultValues = {
  address: '',
  number: '',
  street: '',
  city: '',
  district: '',
  width: 0,
  length: 0,
  height: 0,
  space: 0,
  description: '',
  position: {
    latitude: DEFAULT_LOCATION.latitude,
    longitude: DEFAULT_LOCATION.longitude,
  },
}

const mapAddressToForm = (parking: Parking): typeof defaultValues => {
  const { address, numDirection, district, street, city } = parking.location
  return {
    address,
    number: numDirection,
    street,
    city,
    district,
    height: parking.height,
    width: parking.width,
    length: parking.length,
    space: parking.space,
    description: parking.description,
    position: {
      latitude: parking.location.latitude,
      longitude: parking.location.longitude,
    },
  }
}

const CreateEditParkingPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { user } = useAuth()
  const isEditMode = !!id

  const { data: initialParking, loading } = usePromise(() =>
    isEditMode ? parkingService.getById(id!) : null
  )
  const [sendLoading, setSendLoading] = useState(false)
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues,
    mode: 'onBlur',
    values: initialParking ? mapAddressToForm(initialParking) : undefined,
  })

  const position = watch('position')

  const isLoaded = useApiIsLoaded()
  const map = useMap('create-edit-park-map')

  const onSubmit = async (data: typeof defaultValues) => {
    setSendLoading(true)
    try {
      const payload: UpdateParkingDto = {
        address: data.address,
        numDirection: data.number,
        district: data.district,
        street: data.street,
        city: data.city,
        height: data.height,
        width: data.width,
        length: data.length,
        space: data.space,
        latitude: data.position.latitude,
        longitude: data.position.longitude,
        coordinates: `${data.position.latitude},${data.position.longitude}`,
        price: 10,
        phone: '999 999 999',
        description: data.description,
      }

      if (isEditMode) {
        await parkingService.updateParking(initialParking!.id, payload)
      } else {
        await parkingService.createParking({ ...payload, userId: user!.id! })
      }
      navigate('/my-garages')
    } catch (err) {
      console.error(err)
    } finally {
      setSendLoading(false)
    }
  }

  const handleChangedPlace = (place: google.maps.places.PlaceResult) => {
    if (place.geometry?.location) {
      const lat = place.geometry.location.lat()
      const lng = place.geometry.location.lng()

      console.log(place.geometry.location)

      map?.panTo({ lat, lng })
      map?.setZoom(15)
      setValue('position.latitude', lat)
      setValue('position.longitude', lng)
    }

    if (place.address_components) {
      const number = place.address_components.find((component) =>
        component.types.includes('street_number')
      )

      const address = place.address_components.find((component) =>
        component.types.includes('route')
      )

      const district = place.address_components.find((component) =>
        component.types.includes('sublocality_level_1')
      )

      const street = place.address_components.find((component) =>
        component.types.includes('locality')
      )

      const city = place.address_components.find((component) =>
        component.types.includes('administrative_area_level_2')
      )

      setValue('number', number?.long_name ?? '')
      setValue('address', address?.long_name ?? '')
      setValue('address', address?.long_name ?? '')
      setValue('district', district?.long_name ?? '')
      setValue('street', street?.long_name ?? '')
      setValue('city', city?.long_name ?? '')
    }
  }

  return (
    <BasePage>
      <Title>{isEditMode ? 'Edita tu garage' : 'Registra tu garage'}</Title>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 h-full flex flex-col">
        <div>
          <Title level="h4">Ubicación</Title>
          <div className="flex flex-col gap-1 mt-2">
            <label htmlFor="address" className="text-sm font-medium">
              Dirección
            </label>
            {!loading && (
              <AutocompleteAddress
                onChangedPlace={handleChangedPlace}
                defaultValue={`${initialParking?.location.address ?? ''} ${
                  initialParking?.location.numDirection ?? ''
                }`.trim()}
              />
            )}
          </div>

          <div className="aspect-[16/6] mt-6">
            {isLoaded && !loading && (
              <Map
                id="create-edit-park-map"
                className="w-full h-full rounded-lg overflow-hidden"
                center={{
                  lat: position.latitude ?? DEFAULT_LOCATION.latitude,
                  lng: position.longitude ?? DEFAULT_LOCATION.longitude,
                }}
                defaultZoom={15}
                gestureHandling="greedy"
                disableDefaultUI
              >
                <Marker
                  position={{
                    lat: position.latitude,
                    lng: position.longitude,
                  }}
                  icon={{
                    path: google.maps.SymbolPath.CIRCLE,
                    fillColor: '#00FF00',
                    fillOpacity: 1,
                    strokeColor: '#008800',
                    strokeWeight: 2,
                    scale: 8,
                  }}
                />
              </Map>
            )}
          </div>
          <Divider />
          <Title level="h4">Dimensiones</Title>
          <div className="flex gap-2 mt-2">
            <Controller
              control={control}
              name="space"
              rules={{
                required: { value: true, message: REQUIRED_INPUT_ERROR },
              }}
              render={({ field: { onChange, value, ...field } }) => (
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="space" className="text-sm font-medium">
                    Espacios disponibles
                  </label>
                  <InputNumber
                    id="space"
                    inputClassName="w-full"
                    onValueChange={(e) => onChange(e.value)}
                    suffix=" unidad(es)"
                    value={value}
                    {...field}
                  />
                </div>
              )}
            />

            <Controller
              control={control}
              name="width"
              rules={{
                required: { value: true, message: REQUIRED_INPUT_ERROR },
              }}
              render={({ field: { onChange, value, ...field } }) => (
                <div className="flex flex-col gap-1 w-full grow">
                  <label htmlFor="width" className="text-sm font-medium">
                    Ancho (m)
                  </label>
                  <InputNumber
                    id="width"
                    inputClassName="w-full"
                    onValueChange={(e) => onChange(e.value)}
                    suffix=" m"
                    value={value}
                    {...field}
                  />
                </div>
              )}
            />

            <Controller
              control={control}
              name="length"
              rules={{
                required: { value: true, message: REQUIRED_INPUT_ERROR },
              }}
              render={({ field: { onChange, value, ...field } }) => (
                <div className="flex flex-col gap-1 w-full grow">
                  <label htmlFor="length" className="text-sm font-medium">
                    Largo (m)
                  </label>
                  <InputNumber
                    id="length"
                    inputClassName="w-full"
                    onValueChange={(e) => onChange(e.value)}
                    suffix=" m"
                    value={value}
                    {...field}
                  />
                </div>
              )}
            />

            <Controller
              control={control}
              name="height"
              rules={{
                required: { value: true, message: REQUIRED_INPUT_ERROR },
              }}
              render={({ field: { onChange, value, ...field } }) => (
                <div className="flex flex-col gap-1 w-full">
                  <label htmlFor="height" className="text-sm font-medium">
                    Alto (m)
                  </label>
                  <InputNumber
                    id="height"
                    inputClassName="w-full"
                    onValueChange={(e) => onChange(e.value)}
                    suffix=" m"
                    value={value}
                    {...field}
                  />
                </div>
              )}
            />
          </div>

          <Title level="h4" className="mt-4">
            Descripción
          </Title>

          <div className="mt-2">
            <Controller
              control={control}
              name="description"
              rules={{
                required: { value: true, message: REQUIRED_INPUT_ERROR },
              }}
              render={({ field, fieldState }) => (
                <>
                  <InputTextarea
                    {...field}
                    rows={5}
                    className="w-full text-sm"
                    invalid={!!fieldState.error}
                  />
                  {!!fieldState.error && (
                    <small className="text-red-500 leading">{fieldState.error.message}</small>
                  )}
                </>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <Button
            type="button"
            label="Cancelar"
            size="small"
            severity="danger"
            onClick={() => navigate('/my-garages')}
          />
          <Button label="Guardar" loading={sendLoading} size="small" />
        </div>
      </form>
    </BasePage>
  )
}

export default CreateEditParkingPage
