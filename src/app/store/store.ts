// store.ts
import { Nullable } from 'primereact/ts-helpers'
import { createStore, useStore } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

/* ----------  state & actions ---------- */
interface StoreState {
  auth: { token: Nullable<string> }
  profile: Nullable<unknown>
}

/* ----------  explicit mutators list ----------
   Order **must** match the outer-to-inner wrapping:
   persist(immer(...))  →  ['zustand/persist', unknown], ['zustand/immer', never]
------------------------------------------------- */
type Mutators = [['zustand/persist', unknown], ['zustand/immer', never]]

/* ----------  vanilla store ---------- */
export const appStore = createStore<StoreState, Mutators>(
  persist(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    immer((_set) => ({
      auth: { token: null },
      profile: null,
    })),
    {
      name: 'auth-storage',
      partialize: (s) => ({ auth: s.auth }), // only `auth` is persisted
    }
  )
)

/* ----------  hooks ---------- */
export const useAppStore = (selector: (state: StoreState) => StoreState[keyof StoreState]) => {
  const state = useStore(appStore, selector)

  return state
}
