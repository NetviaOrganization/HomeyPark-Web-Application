import { usePromise } from '@/shared/hooks/usePromise'
import { AxiosError } from 'axios'
import { useState, useEffect } from 'react'
import { useAuth } from '../../auth/context/AuthContext'
import { Parking } from '../model/parking'
import ParkingService from '../services/ParkingService'

const parkingService = new ParkingService()

export const useMyParkings = () => {
  const { profile, loading } = useAuth()

  const {
    data,
    loading: loadingData,
    error,
  } = usePromise<Parking[] | null, AxiosError>(() => {
    if (!profile?.id) return null
    return parkingService.getAllByProfileId(profile.id)
  }, [profile?.id, loading])

  const [parkingList, setParkingList] = useState<Parking[]>([])

  useEffect(() => {
    setParkingList(data || [])
  }, [data])

  const handleDeleteParking = async (id: string | number) => {
    await parkingService.deleteParkingById(id)
    setParkingList((prev) => prev.filter((parking) => parking.id !== id))
  }

  return { parkingList, loading: loading || loadingData, error, handleDeleteParking }
}
