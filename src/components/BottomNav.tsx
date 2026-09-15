import { useNavigate, useLocation } from 'react-router-dom'
import { Home, MessageSquare, PlusSquare, User } from 'lucide-react'

/**
 * BottomNav — Persistent bottom navigation bar.
 * Matches screen12 & screen13:
 *  - 4 icons: Home, Messages, Create/Post, Profile
 *  - Fixed bottom, pure black background, border-t border-[#222]
 *  - Active icon is white, inactive is muted
 */
export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { label: 'Home', icon: Home, path: '/home' },
    { label: 'Chat', icon: MessageSquare, path: '/chat' },
    { label: 'Create', icon: PlusSquare, path: '/create' },
    { label: 'Profile', icon: User, path: '/profile' },
  ]

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 w-full z-40 bg-black flex items-center"
      style={{
        height: 'calc(60px + env(safe-area-inset-bottom, 0px))',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        borderTop: '1px solid #252525',
        borderBottom: '1px solid #000000',
        borderLeft: 'none',
        borderRight: 'none',
      }}
    >
      <div className="w-full h-full flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          const IconComponent = item.icon
          return (
            <button
              key={item.label}
              onClick={() => {
                if (item.path === '/chat' || item.path === '/create') {
                  // Stub or navigate to profile/home
                  return
                }
                navigate(item.path)
              }}
              className={`flex items-center justify-center transition-colors cursor-pointer ${
                isActive ? 'text-white' : 'text-[#666666] hover:text-white/80'
              }`}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <IconComponent size={28} strokeWidth={isActive ? 2.3 : 1.8} className="w-[28px] h-[28px]" />
            </button>
          )
        })}
      </div>
    </nav>
  )
}
