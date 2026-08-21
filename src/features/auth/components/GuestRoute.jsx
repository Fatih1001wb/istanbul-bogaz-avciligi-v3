import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Loader from '../../../components/common/Loader'

// Giriş yapmış kullanıcıları login/register sayfalarından uzaklaştırır.
export default function GuestRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  if (loading) return <Loader message="Oturum kontrol ediliyor..." />

  if (isAuthenticated) {
    return <Navigate to={from} replace />
  }

  return children
}
