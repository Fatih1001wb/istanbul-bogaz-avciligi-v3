import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import MobileBottomNav from './MobileBottomNav'

// Tüm sayfaları saran ana iskelet: Navbar + içerik + Footer + mobil alt nav
export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pb-0">
        <Outlet />
      </main>
      <Footer className="hidden lg:block" />
      <MobileBottomNav />
    </div>
  )
}
