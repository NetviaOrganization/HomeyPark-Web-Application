import { createBrowserRouter, Navigate, useLocation } from 'react-router'
import DashboardLayout from '../layout/DashboardLayout'
import FindYourParkPage from '../features/parking/pages/FindYourParkPage'
import MyReservationsPage from '../features/reservations/pages/MyReservationsPage'
import MyParkingsPage from '../features/parking/pages/MyParkingsPage'
import NotFoundPage from '../../shared/page/NotFoundPage'
import ParkingDetailPage from '../features/parking/pages/ParkingDetailPage'
import LoginPage from '../features/auth/pages/LoginPage'
import SignUpPage from '../features/auth/pages/SignUpPage'
import { useAuth } from '../features/auth/context/AuthContext'
import CreateEditParkingPage from '../features/parking/pages/CreateEditParkingPage'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginRedirect />,
  },
  { path: '/signup', element: <SignupRedirect /> },
  {
    path: '/',
    element: <ProtectedRoute />,
    // Component: ProtectedRoute,
    children: [
      {
        path: '',
        Component: () => <Navigate to="/find-your-parking" replace />,
      },
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
        // Component: MyParkingsPage,
        children: [
          { path: '', Component: MyParkingsPage },
          {
            id: 'parking/create',
            path: 'create',
            Component: CreateEditParkingPage,
          },
          {
            id: 'parking/edit',
            path: 'edit/:id',
            Component: CreateEditParkingPage,
          },
        ],
      },
      {
        path: '*',
        Component: NotFoundPage,
      },
    ],
  },
])

function ProtectedRoute() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <DashboardLayout />
}

function LoginRedirect() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/find-your-parking'

  if (isAuthenticated) {
    return <Navigate to={from} replace />
  }

  return <LoginPage />
}

function SignupRedirect() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/find-your-parking'

  if (isAuthenticated) {
    return <Navigate to={from} replace />
  }

  return <SignUpPage />
}
