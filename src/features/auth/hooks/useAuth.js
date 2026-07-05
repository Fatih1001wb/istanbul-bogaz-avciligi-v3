import { useAuthContext } from '../context/AuthContext'

// Bileşenlerin auth durumuna erişmek için kullandığı tek hook.
export function useAuth() {
  return useAuthContext()
}
