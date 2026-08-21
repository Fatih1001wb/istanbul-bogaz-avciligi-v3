import { ThemeProvider } from '../context/ThemeContext'
import { AuthProvider } from '../features/auth/context/AuthContext'
import { RealtimeProvider } from '../features/realtime'

// Tüm global provider'lar tek yerde, doğru sırada sarılır.
export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RealtimeProvider>{children}</RealtimeProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
