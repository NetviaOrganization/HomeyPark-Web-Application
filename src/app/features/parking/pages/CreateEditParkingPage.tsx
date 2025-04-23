import BasePage from '@/app/shared/page/BasePage'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Parking } from '../model/parking'
import ParkingService from '../services/parkingService'
import { usePromise } from '@/app/shared/hooks/usePromise'
import { Controller, useForm } from 'react-hook-form'
import Title from '@/app/shared/components/Title'
import { InputText } from 'primereact/inputtext'
import { Divider } from 'primereact/divider'
import { InputNumber } from 'primereact/inputnumber'

const parkingService = new ParkingService()

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
  }
}

const CreateEditParkingPage = () => {
  const { id } = useParams()
  const isEditMode = !!id

  const { data: initialParking } = usePromise(() =>
    isEditMode ? parkingService.getById(id!) : null
  )

  const { control, handleSubmit } = useForm({
    defaultValues,
    mode: 'onBlur',
    values: initialParking ? mapAddressToForm(initialParking) : undefined,
  })

  const onSubmit = (data: typeof defaultValues) => {
    console.log(data)
  }

  return (
    <BasePage>
      <Title>{isEditMode ? 'Edita tu garage' : 'Registra tu garage'}</Title>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <Title level="h4">Ubicación</Title>
        <Controller
          control={control}
          name="address"
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <label htmlFor="address" className="text-sm font-medium">
                Dirección
              </label>
              <InputText
                id="address"
                // defaultValue={}
                placeholder="Avenida Alfredo Benavides 2310, Miraflores, Lima"
                {...field}
              />
            </div>
          )}
        />

        <Divider />
        <Title level="h4">Dimensiones</Title>
        <div className="flex gap-2">
          <Controller
            control={control}
            name="space"
            render={({ field: { onChange, value, ...field } }) => (
              <div className="flex flex-col gap-2 w-full">
                <label htmlFor="space" className="text-sm font-medium">
                  Espacios disponibles
                </label>
                <InputNumber
                  id="space"
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
            name="width"
            render={({ field: { onChange, value, ...field } }) => (
              <div className="flex flex-col gap-2 w-full grow">
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
            render={({ field: { onChange, value, ...field } }) => (
              <div className="flex flex-col gap-2 w-full grow">
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
            render={({ field: { onChange, value, ...field } }) => (
              <div className="flex flex-col gap-2 w-full">
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
      </form>
    </BasePage>
  )
}

export default CreateEditParkingPage
