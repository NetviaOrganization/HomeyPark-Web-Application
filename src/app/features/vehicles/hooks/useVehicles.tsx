import { AxiosError } from 'axios'
import { useState, useEffect } from 'react'
import { useAuth } from '../../auth/context/AuthContext'
import type { Vehicle } from '../model/vehicle'
import VehicleService from '../services/vehicleService'

const vehicleService = new VehicleService()

export const useVehicles = () => {
  const { loading: loadingProfile, authUser } = useAuth()

  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<AxiosError | null>(null)

  useEffect(() => {
    if (loadingProfile) return

    if (!authUser?.id) {
      setVehicles([])
      setLoading(false)
      return
    }

    const fetchVehicles = async () => {
      try {
        const response = await vehicleService.getAllByUserId(authUser.id)

        setVehicles(response)
      } catch (err) {
        setError(err as AxiosError)
      } finally {
        setLoading(false)
      }
    }

    fetchVehicles()
  }, [authUser?.id, loadingProfile])

  const deleteVehicle = async (vehicleId: string | number) => {
    try {
      await vehicleService.deleteById(vehicleId)
      setVehicles((prev) => prev.filter((vehicle) => vehicle.id !== vehicleId))
    } catch (err) {
      setError(err as AxiosError)
    } finally {
      setLoading(false)
    }
  }

  return { vehicles, loading, error, deleteVehicle }
}
