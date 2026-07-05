import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../features/auth/hooks/useAuth'
import Loader from '../components/common/Loader'

// Giriş gerektiren sayfaları sarar. Oturum yoksa /giris'e yönlendirir.
export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) return <Loader message="Oturum kontrol ediliyor..." />

  if (!isAuthenticated) {
    return <Navigate to="/giris" state={{ from: location }} replace />
  }

  return children
}
