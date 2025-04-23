import { createBrowserRouter } from 'react-router'
import DashboardLayout from '../layout/DashboardLayout'
import FindYourParkPage from '../features/parking/pages/FindYourParkPage'
import MyReservationsPage from '../features/reservations/pages/MyReservationsPage'
import MyParkingsPage from '../features/parking/pages/MyParkingsPage'
import NotFoundPage from '../shared/page/NotFoundPage'
import ParkingDetailPage from '../features/parking/pages/ParkingDetailPage'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: DashboardLayout,
    children: [
      {
        path: '/find-your-parking',
        children: [
          {
            path: '',
            Component: FindYourParkPage,
          },
          {
            path: ':id',
            Component: ParkingDetailPage,
          },
        ],
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
