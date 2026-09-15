import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AuthProvider, useAuth } from './context/AuthContext'
import type { ReactNode } from 'react'

// Pages
import LandingPage from './pages/LandingPage'
import TermsPage from './pages/TermsPage'
import LocationPage from './pages/LocationPage'
import HomePage from './pages/HomePage'
import EmailPage from './pages/EmailPage'
import OtpPage from './pages/OtpPage'
import UsernamePage from './pages/signup/UsernamePage'
import NamePage from './pages/signup/NamePage'
import AgePage from './pages/signup/AgePage'
import PronounsPage from './pages/signup/PronounsPage'
import InvitePage from './pages/signup/InvitePage'
import ProfilePage from './pages/ProfilePage'

/**
 * ProtectedRoute — Ensures user is authenticated before viewing profile data.
 * Redirects unauthenticated users to landing page.
 */
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Sonner toast container */}
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: '#FFFFFF',
              color: '#000000',
              border: 'none',
              borderRadius: '12px',
              fontSize: '14px',
              fontFamily: 'Poppins, sans-serif',
            },
          }}
        />

        <Routes>
          {/* Phase 1: Landing → Terms → Location flow */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/home" element={<HomePage />} />

          {/* Phase 2: Auth Flow */}
          <Route path="/email" element={<EmailPage />} />
          <Route path="/otp" element={<OtpPage />} />

          {/* Phase 3: Signup Wizard Flow */}
          <Route path="/signup/username" element={<UsernamePage />} />
          <Route path="/signup/name" element={<NamePage />} />
          <Route path="/signup/age" element={<AgePage />} />
          <Route path="/signup/pronouns" element={<PronounsPage />} />
          <Route path="/signup/invite" element={<InvitePage />} />

          {/* Protected Profile Page — requires authenticated user data */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
