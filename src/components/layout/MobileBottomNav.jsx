import { NavLink } from 'react-router-dom'
import { BOTTOM_NAV_LINKS } from '../../utils/constants'
import { useAuth } from '../../features/auth/hooks/useAuth'

const ICONS = {
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
      <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z" strokeLinejoin="round" />
    </svg>
  ),
  fish: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
      <path d="M2 16s3-5 10-5 10 5 10 5-3 5-10 5S2 16 2 16z" />
      <circle cx="16" cy="12" r="1" fill="currentColor" />
    </svg>
  ),
  weather: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    </svg>
  ),
  community: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  ),
  profile: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6">
      <circle cx="12" cy="8" r="4" />
      <path d="M6 20v-1a6 6 0 0 1 12 0v1" />
    </svg>
  ),
}

export default function MobileBottomNav() {
  const { isAuthenticated } = useAuth()

  const links = BOTTOM_NAV_LINKS.map((link) => {
    if (link.authOnly && !isAuthenticated) {
      return { ...link, to: '/giris' }
    }
    return link
  })

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-800 bg-mavirota-deep/95 backdrop-blur-lg lg:hidden"
      aria-label="Mobil navigasyon"
    >
      <div className="mobile-nav-safe flex items-stretch justify-around">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-medium transition ${
                isActive
                  ? 'text-brand-400'
                  : 'text-slate-500 hover:text-slate-300'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`rounded-xl p-1 transition ${
                    isActive ? 'bg-brand-500/15' : ''
                  }`}
                >
                  {ICONS[link.icon]}
                </span>
                <span>{link.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
