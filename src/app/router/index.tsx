import { createBrowserRouter, Navigate } from 'react-router'
import DashboardLayout from '../layout/DashboardLayout'
import FindYourParkPage from '../features/parking/pages/FindYourParkPage'
import MyReservationsPage from '../features/reservations/pages/MyReservationsPage'
import MyParkingsPage from '../features/parking/pages/MyParkingsPage'
import NotFoundPage from '../shared/page/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: DashboardLayout,
    children: [
      {
        path: '/find-your-parking',
        Component: FindYourParkPage,
      },
      {
        path: '/my-reservations',
        Component: MyReservationsPage,
      },
      {
        path: '/my-garages',
        Component: MyParkingsPage,
      },
      {
        path: '*',
        Component: NotFoundPage,
      },
    ],
  },
])
