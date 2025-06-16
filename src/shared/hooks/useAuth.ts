import { useAppStore } from '@/app/store/store'

export const useAuthState = () => {
  const profileId = useAppStore((state) => state.auth.profileId)
  const token = useAppStore((state) => state.auth.token)

  return { profileId, token }
}
