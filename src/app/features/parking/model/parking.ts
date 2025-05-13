export type Parking = {
  id: 0
  profileId: number
  width: number
  length: number
  height: number
  price: number
  phone: string
  space: string
  description: string
  address: string
  numDirection: string
  street: string
  district: string
  city: string
  latitude: number
  longitude: number
  day: string
  startTime: string
  endTime: string
}

export type UpdateParkingDto = Omit<
  Parking,
  'id' | 'profileId' | 'day' | 'startTime' | 'endTime'
> & {
  coordinates: string
}

export type CreateParkingDto = Omit<UpdateParkingDto, 'coordinates'> & {
  profileId: number
}
