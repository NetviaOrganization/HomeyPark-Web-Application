/* eslint-disable @typescript-eslint/no-explicit-any */
export type Parking = {
  id: number
  width: number
  length: number
  height: number
  price: number
  phone: string
  space: number
  description: string
  location: Location
  schedules: any[] // You might want to define a Schedule type later
  user: User
}

export type Location = {
  id: number
  address: string
  numDirection: string
  street: string
  district: string
  city: string
  latitude: number
  longitude: number
}

export type User = {
  id: number
  name: string
  lastName: string
  email: string
  password: string
  dateCreated: string
  vehicles: any[] // You might want to define a Vehicle type later
  cards: any[] // You might want to define a Card type later
}
