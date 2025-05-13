import { usePromise } from '@/shared/hooks/usePromise'
import { AxiosError } from 'axios'
import { useState, useEffect } from 'react'
import { useAuth } from '../../auth/context/AuthContext'
import { Parking } from '../model/parking'
import ParkingService from '../services/parkingService'

const parkingService = new ParkingService()

export const useMyParkings = () => {
  const { profile } = useAuth()

  const { data, loading, error } = usePromise<Parking[], AxiosError>(() => {
    if (!profile?.id) return Promise.resolve([])
    return parkingService.getAllByProfileId(profile.id)
  }, [profile?.id])

  const [parkingList, setParkingList] = useState<Parking[]>([])
  useEffect(() => {
    setParkingList(data || [])
  }, [data])

  const handleDeleteParking = async (id: string | number) => {
    await parkingService.deleteParkingById(id)
    setParkingList((prev) => prev.filter((parking) => parking.id !== id))
  }

  return { parkingList, loading, error, handleDeleteParking }
}
