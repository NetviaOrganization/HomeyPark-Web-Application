import { appStore } from '@/app/store/store'

export const logout = () => {
  const { setState: set } = appStore

  set((state) => {
    state.auth.token = null
    state.auth.profileId = null
  })
}
