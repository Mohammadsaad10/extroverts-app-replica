import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, MessageSquareMore, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Logo, Button } from '../components/ui'
import Toast from '../components/ui/Toast'
import BottomNav from '../components/BottomNav'
import EventCard from '../components/EventCard'
import { mockEvents } from '../data/mockEvents'
import { useAuth } from '../context/AuthContext'

/**
 * HomePage — Screen 4 (Pre-Auth Feed)
 *
 * Exact Figma positioning (1920x1080 canvas):
 *  1. Header:
 *     - Logo: height 40px, 78px from top, 32px from left
 *     - Icons at right end on the same line: VIP 0 badge, Bell, Chat (32px right margin)
 *  2. "YOUR CLUB" text:
 *     - 160px from top, 40px gap below logo, 25px margin left
 *  3. "Silver Club Member" box:
 *     - Top edge: 185px from top
 *     - Box height: 89px, border radius: 11px, margin left-right: 25px
 *     - "Silver Club Member" at left end, Gem/Diamond at right end (justify-between)
 *     - Integrated progress bar along the bottom of the card
 *  4. "You have 160..." text + coin:
 *     - 15px gap below the Silver Club box, 25px margin left
 *  5. First card:
 *     - 362px from the top, margin left-right: 25px
 *  6. EventCard:
 *     - 40px padding all sides, 400px image height, opposite-ends alignment
 *  7. "YOU NEED AN ACCOUNT" Bottom Sheet popup (screen4e):
 *     - Height: 442px from bottom
 *     - 50px padding all sides
 *     - "YOU NEED AN ACCOUNT" text is 64px from top of popup, with Close (X) at right end
 *     - "Create an account..." line centered, 64px below the title
 *     - "GET STARTED" button is 240px from top of popup (~65px below subtitle)
 *     - "MAYBE LATER" button is 25px below "GET STARTED"
 */
const getBadgeImage = (tier?: string) => {
  if (tier && tier.toLowerCase().includes('silver')) {
    return '/img/silver-badge.png'
  }
  return '/img/bronze-badge.png'
}

export default function HomePage() {
  const navigate = useNavigate()
  const [showAccountPopup, setShowAccountPopup] = useState(false)
  const { isAuthenticated, currentUser, showSignupSuccessToast, setShowSignupSuccessToast } = useAuth()

  const handleTriggerAccountPopup = () => {
    if (isAuthenticated) return
    setShowAccountPopup(true)
  }

  return (
    <div className="min-h-dvh bg-[#151515] text-white relative select-none">
      {/* ═══════════════════ HEADER ═══════════════════ */}
      {/* Logo: 44px height, 78px from top, 32px from left */}
      <header
        className="w-full flex items-center justify-between"
        style={{
          paddingTop: 'clamp(28px, 7.22vh, 78px)',
          paddingLeft: 'clamp(12px, 1.67vw, 32px)',
          paddingRight: 'clamp(12px, 1.67vw, 32px)',
        }}
      >
        {/* Logo E• at left end (height: 44px) */}
        <div className="flex items-center">
          <Logo
            size="sm"
            style={{
              height: 'clamp(32px, 4.07vh, 44px)',
              width: 'auto',
            }}
          />
        </div>

        {/* Action icons at right end on the same line (all icons height: 54px) */}
        <div className="flex items-center gap-[clamp(6px,1.2vw,18px)] flex-shrink-0">
          {/* VIP 0 badge (height: 54px) */}
          <div
            className="flex items-center gap-1.5 border border-[#666666] rounded-full text-white select-none flex-shrink-0"
            style={{
              height: 'clamp(32px, 5.0vh, 54px)',
              paddingLeft: 'clamp(10px, 1.2vw, 20px)',
              paddingRight: 'clamp(10px, 1.2vw, 20px)',
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(11px, 1.3vw, 15px)',
            }}
          >
            <span className="font-bold tracking-wider">VIP</span>
            <span className="font-medium">0</span>
          </div>

          {/* Notification bell (height: 54px, non-functional) */}
          <button
            type="button"
            className="flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer flex-shrink-0"
            style={{
              height: 'clamp(32px, 5.0vh, 54px)',
              width: 'clamp(32px, 5.0vh, 54px)',
            }}
            aria-label="Notifications"
          >
            <Bell className="w-[clamp(20px,3.0vh,32px)] h-[clamp(20px,3.0vh,32px)]" />
          </button>

          {/* Chat icon (height: 54px) — triggers "You Need An Account" popup */}
          <button
            type="button"
            onClick={handleTriggerAccountPopup}
            className="flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer flex-shrink-0"
            style={{
              height: 'clamp(32px, 5.0vh, 54px)',
              width: 'clamp(32px, 5.0vh, 54px)',
            }}
            aria-label="Messages"
          >
            <MessageSquareMore className="w-[clamp(20px,3.0vh,32px)] h-[clamp(20px,3.0vh,32px)]" />
          </button>
        </div>
      </header>

      {/* ═══════════════════ CLUB SECTION ═══════════════════ */}
      {/* "YOUR CLUB" text: 160px from top, 40px gap from logo */}
      <div
        style={{
          marginTop: 'clamp(20px, 3.89vh, 42px)',
          paddingLeft: 'clamp(12px, 1.3vw, 25px)',
          paddingRight: 'clamp(12px, 1.3vw, 25px)',
        }}
      >
        <p
          className="uppercase tracking-wider text-[#888888] font-normal"
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(14px, 2.22vh, 24px)',
            fontWeight: 400,
          }}
        >
          YOUR CLUB
        </p>
      </div>

      {/* "Silver Club Member" box: just below "YOUR CLUB" text (minimal gap ~8px) */}
      <div
        style={{
          marginTop: 'clamp(4px, 0.74vh, 8px)',
          marginLeft: 'clamp(12px, 1.3vw, 25px)',
          marginRight: 'clamp(12px, 1.3vw, 25px)',
          height: 'clamp(56px, 8.24vh, 89px)',
          borderRadius: '11px',
          border: '2px solid #BABABA',
          paddingTop: 'clamp(12px, 1.85vh, 20px)',
          paddingLeft: 'clamp(14px, 1.35vw, 26px)',
          paddingRight: 'clamp(14px, 1.35vw, 26px)',
        }}
        className="bg-[#0D0D0D] flex flex-col relative overflow-hidden"
      >
        {/* Left: "Silver Club Member", Right: Gem icon */}
        <div className="flex items-center justify-between">
          <span
            className="text-white font-semibold leading-none"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 600,
              fontSize: 'clamp(14px, 2.22vh, 24px)',
              letterSpacing: '0.025em',
            }}
          >
            {currentUser ? currentUser.clubTier : 'Silver Club Member'}
          </span>
          <img
            src={getBadgeImage(currentUser ? currentUser.clubTier : 'Silver Club Member')}
            alt={currentUser ? currentUser.clubTier : 'Silver Club Member'}
            className="select-none object-contain pointer-events-none"
            style={{
              height: 'clamp(24px, 3.7vh, 40px)',
              width: 'auto',
            }}
          />
        </div>

        {/* Progress line: enclosed with #BABABA border (2px), height 19px (white progress, black remainder) */}
        <div
          className="absolute bottom-0 left-0 right-0 flex bg-black overflow-hidden border-t-2 border-[#BABABA]"
          style={{
            height: 'clamp(12px, 1.76vh, 19px)',
          }}
        >
          {/* White progress line */}
          <div className="h-full bg-white" style={{ width: currentUser ? '15%' : '72%' }} />
          {/* Remainder is black */}
          <div className="h-full bg-black flex-1" />
        </div>
      </div>

      {/* "You have 160 ..": gap between box and text+coin: 15px */}
      <div
        className="flex items-center gap-2"
        style={{
          marginTop: 'clamp(8px, 1.39vh, 15px)',
          paddingLeft: 'clamp(12px, 1.3vw, 25px)',
          paddingRight: 'clamp(12px, 1.3vw, 25px)',
        }}
      >
        <span className="text-base">🪙</span>
        <span
          className="text-white font-bold uppercase tracking-wider"
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(11px, 1.1vw, 13px)',
          }}
        >
          {currentUser
            ? `You have ${currentUser.tokens} Honorary Vibe Tokens!`
            : 'You have 160 Honorary Vibe Tokens!'}
        </span>
      </div>

      {/* ═══════════════════ EVENT FEED ═══════════════════ */}
      {/* First card starts 40px below the 'you have 160...' line */}
      <section
        style={{
          marginTop: 'clamp(20px, 3.7vh, 40px)',
          paddingBottom: isAuthenticated ? 'clamp(80px, 9.5vh, 96px)' : 'clamp(40px, 8vh, 80px)',
        }}
      >
        {/* All cards have 40px vertical gap between them */}
        <div
          className="flex flex-col"
          style={{
            gap: 'clamp(20px, 3.7vh, 40px)',
          }}
        >
          {mockEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onJoinClick={handleTriggerAccountPopup}
            />
          ))}
        </div>
      </section>

      {/* ═══════════════════ "YOU NEED AN ACCOUNT" POPUP (Screen 4e) ═══════════════════ */}
      {/* Height: 442px from bottom, padding: 50px all sides, 64px offsets */}
      <AnimatePresence>
        {showAccountPopup && (
          <>
            {/* Dark semi-transparent backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/75 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setShowAccountPopup(false)}
            />

            {/* Bottom Sheet Modal */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-50 bg-[#121212] rounded-t-3xl overflow-hidden shadow-2xl flex flex-col"
              style={{
                paddingTop: 'clamp(24px, 3.5vh, 36px)',
                paddingBottom: 'calc(clamp(18px, 2.5vh, 28px) + env(safe-area-inset-bottom, 0px))',
                paddingLeft: 'clamp(20px, 4vw, 50px)',
                paddingRight: 'clamp(20px, 4vw, 50px)',
              }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              {/* Decorative top drag handle */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2">
                <div className="w-12 h-1.5 rounded-full bg-white/30" />
              </div>

              {/* Title row: "YOU NEED AN ACCOUNT" at left, Close icon at right (opposite ends) */}
              <div className="flex items-center justify-between">
                <h2
                  className="font-bold uppercase text-white"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 600,
                    fontSize: 'clamp(20px, 2.8vw, 32px)',
                  }}
                >
                  You Need An Account
                </h2>

                <button
                  type="button"
                  onClick={() => setShowAccountPopup(false)}
                  className="p-1 text-white/70 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X size={22} />
                </button>
              </div>

              {/* "Create an account..." line: centered, 64px below title line */}
              <div
                className="w-full flex justify-center text-center px-2"
                style={{
                  marginTop: 'clamp(18px, 5.93vh, 64px)',
                }}
              >
                <p
                  className="leading-relaxed text-center max-w-2xl mx-auto break-words"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 400,
                    fontSize: 'clamp(13px, 1.15vw, 18px)',
                    color: '#ECECEC',
                  }}
                >
                  Create an account to join events, earn HVTs, and party with extroverts near you– all for free!
                </p>
              </div>

              {/* Action Buttons */}
              <div
                className="flex flex-col w-full"
                style={{
                  marginTop: 'clamp(30px, 6vh, 50px)',
                }}
              >
                {/* GET STARTED button (white, full width) */}
                <Button
                  onClick={() => {
                    setShowAccountPopup(false)
                    navigate('/email')
                  }}
                  className="w-full !rounded-[10px] !normal-case"
                  style={{
                    borderRadius: '10px',
                    backgroundColor: '#FFFFFF',
                    color: '#000000',
                    height: 'clamp(56px, 7vh, 76px)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      fontSize: 'clamp(15px, 1.55vw, 21px)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    GET STARTED
                  </span>
                </Button>

                {/* MAYBE LATER button */}
                <Button
                  variant="secondary"
                  onClick={() => setShowAccountPopup(false)}
                  className="w-full !rounded-[10px] !normal-case"
                  style={{
                    marginTop: 'clamp(10px, 1.4vh, 15px)',
                    borderRadius: '10px',
                    height: 'clamp(56px, 7vh, 76px)',
                    border: '1px solid #FFFFFF',
                    backgroundColor: 'transparent',
                    color: '#FFFFFF',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontStyle: 'normal',
                      fontWeight: 500,
                      fontSize: 'clamp(15px, 1.55vw, 21px)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    MAYBE LATER
                  </span>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Signup Success Toast */}
      <Toast
        isVisible={showSignupSuccessToast}
        message="Signed up successfully"
        type="success"
        bottomOffset={isAuthenticated ? 'clamp(74px, 8.5vh, 80px)' : undefined}
        onClose={() => setShowSignupSuccessToast(false)}
      />

      {/* Bottom Navigation (visible when authenticated) */}
      {isAuthenticated && <BottomNav />}
    </div>
  )
}
