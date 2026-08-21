import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import ProtectedRoute from '../routes/ProtectedRoute'
import GuestRoute from '../features/auth/components/GuestRoute'

import HomePage from '../pages/HomePage'
import FishGuidePage from '../pages/FishGuidePage'
import FishDetailPage from '../pages/FishDetailPage'
import RegulationsPage from '../pages/RegulationsPage'
import WeatherPage from '../pages/WeatherPage'
import SpotsPage from '../pages/SpotsPage'
import CommunityPage from '../pages/CommunityPage'
import ProfilePage from '../pages/ProfilePage'
import SettingsPage from '../pages/SettingsPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import FishAdminPage from '../pages/admin/FishAdminPage'
import NotFoundPage from '../pages/NotFoundPage'

// Merkezi route tanımları. Korumalı sayfalar ProtectedRoute ile sarılır.
export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/balik-rehberi', element: <FishGuidePage /> },
      { path: '/balik/:id', element: <FishDetailPage /> },
      { path: '/admin/baliklar', element: <FishAdminPage /> },
      { path: '/kurallar', element: <RegulationsPage /> },
      { path: '/hava-deniz', element: <WeatherPage /> },
      { path: '/av-noktalari', element: <SpotsPage /> },
      { path: '/topluluk', element: <CommunityPage /> },
      {
        path: '/giris',
        element: (
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        ),
      },
      {
        path: '/kayit',
        element: (
          <GuestRoute>
            <RegisterPage />
          </GuestRoute>
        ),
      },
      {
        path: '/profil',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/ayarlar',
        element: (
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        ),
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
