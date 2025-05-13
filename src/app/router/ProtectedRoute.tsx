import { useLocation, Navigate } from 'react-router'
import { useAuth } from '../features/auth/context/AuthContext'
import DashboardLayout from '../layout/DashboardLayout'
import SignUpPage from '../features/auth/pages/SignUpPage'
import LoginPage from '../features/auth/pages/LoginPage'

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <DashboardLayout />
}

export const SignupRedirect = () => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/find-your-parking'

  if (isAuthenticated) {
    return <Navigate to={from} replace />
  }

  return <SignUpPage />
}

export const LoginRedirect = () => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/find-your-parking'

  if (isAuthenticated) {
    return <Navigate to={from} replace />
  }

  return <LoginPage />
}
