import { Link, NavLink, useNavigate } from 'react-router-dom'
import { NAV_LINKS, APP_NAME, APP_VERSION } from '../../utils/constants'
import { useAuth } from '../../features/auth/hooks/useAuth'
import ThemeToggle from '../ui/ThemeToggle'
import Button from '../ui/Button'

export default function Navbar() {
  const { isAuthenticated, signOut, profile } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const linkClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-sm font-medium transition ${
      isActive
        ? 'bg-brand-50 text-brand-700 dark:bg-brand-950 dark:text-brand-300'
        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
    }`

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <nav className="container-page flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold">
          <span className="text-2xl">🎣</span>
          <span className="hidden text-slate-900 dark:text-slate-100 sm:block">
            {APP_NAME} <span className="text-brand-600">{APP_VERSION}</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === '/'}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isAuthenticated ? (
            <div className="hidden items-center gap-2 sm:flex">
              <Link to="/profil" className="text-sm font-medium text-slate-700 hover:text-brand-600 dark:text-slate-200">
                {profile?.username || 'Profil'}
              </Link>
              <Button size="sm" variant="outline" onClick={handleSignOut}>
                Çıkış
              </Button>
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link to="/giris">
                <Button size="sm" variant="ghost">Giriş</Button>
              </Link>
              <Link to="/kayit">
                <Button size="sm">Kayıt Ol</Button>
              </Link>
            </div>
          )}
          <div className="flex items-center gap-2 lg:hidden">
            {isAuthenticated ? (
              <Link to="/profil" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                {profile?.username?.[0]?.toUpperCase() || 'P'}
              </Link>
            ) : (
              <Link to="/giris">
                <Button size="sm" variant="ghost">Giriş</Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
