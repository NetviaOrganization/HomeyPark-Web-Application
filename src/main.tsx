import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrimeReactProvider } from 'primereact/api'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './app/router/index.tsx'
import { APIProvider } from '@vis.gl/react-google-maps'
import { env } from './env/index.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <APIProvider apiKey={env.googleMaps.apiKey}>
      <PrimeReactProvider>
        <RouterProvider router={router} />
      </PrimeReactProvider>
    </APIProvider>
  </StrictMode>
)
