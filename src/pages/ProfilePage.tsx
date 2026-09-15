import { useNavigate } from 'react-router-dom'
import { ChevronRight, Image as ImageIcon, Mail } from 'lucide-react'
import BottomNav from '../components/BottomNav'
import { Button } from '../components/ui'
import { useAuth } from '../context/AuthContext'

/**
 * ProfilePage — Screen 13
 * Matches screen13_profile_page.png and screen13_profile_page_logout.png:
 *  - Hero banner with giant initial letter, username, age, pronouns
 *  - Club card (Bronze Club Member) + HVTs progress
 *  - VIP Passes card (orange dashed border)
 *  - Invite Passes card (blue dashed border)
 *  - Spotlight for Business promo card
 *  - LOG OUT button (resets auth, navigates to /)
 *  - Persistent Bottom Navigation Bar
 */
const getBadgeImage = (tier?: string) => {
  if (tier && tier.toLowerCase().includes('silver')) {
    return '/img/silver-badge.png'
  }
  return '/img/bronze-badge.png'
}

export default function ProfilePage() {
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()

  const user = currentUser || {
    username: 'partyboy',
    name: 'partyboy',
    age: 18,
    pronouns: ['he', 'him', 'his'],
    clubTier: 'Bronze Club Member' as const,
    tokens: 0,
    vipPasses: 0,
    invitePasses: 3,
  }

  const partyName = user.name || user.username || 'partyboy'
  const username = user.username || 'partyboy'
  const initial = (partyName || username).charAt(0).toUpperCase()
  const pronounsFormatted = user.pronouns.join('/')

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-dvh bg-[#151515] text-white relative select-none">
      {/* ═══════════════════ HERO BANNER (A little less than 3/4th of screen ~68vh) ═══════════════════ */}
      <div
        className="w-full relative overflow-hidden bg-gradient-to-b from-[#2a2a2a] via-[#454545] to-[#2e2e2e] select-none"
        style={{
          height: 'clamp(450px, 68vh, 650px)',
        }}
      >
        {/* Giant Watermark Initial — expands all over this first section with top-bottom padding, horizontally centered */}
        <div
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          style={{
            top: 'clamp(22px, 3.5vh, 35px)',
            bottom: 'clamp(22px, 3.5vh, 35px)',
          }}
        >
          <span
            className="text-white font-black"
            style={{
              color: '#FFFFFF',
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(280px, 38vw, 620px)',
              lineHeight: 1,
            }}
          >
            {initial}
          </span>
        </div>

        {/* User Identity Overlay — positioned proportionately from top */}
        <div
          className="absolute inset-x-0 z-10 flex items-end justify-between"
          style={{
            top: 'clamp(340px, 52.5vh, 506px)',
            paddingLeft: '40px',
            paddingRight: '40px',
          }}
        >
          <div>
            {/* Row 1: partyname (partyboy) + beside it is age */}
            <div className="flex items-baseline gap-2.5">
              <h1
                className="font-bold text-white leading-none"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 'clamp(24px, 3.2vw, 38px)',
                }}
              >
                {partyName}
              </h1>
              <span
                className="text-white/70 font-semibold leading-none"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 'clamp(18px, 2.2vw, 26px)',
                }}
              >
                {user.age}
              </span>
            </div>

            {/* Row 2: immediately below it is username and pronouns beside it */}
            <div className="flex items-baseline gap-2 mt-1.5">
              <span
                className="text-white font-normal leading-tight"
                style={{
                  color: '#FFFFFF',
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 'clamp(13px, 1.4vw, 17px)',
                }}
              >
                @{username}
              </span>
              <span
                className="text-[#888888] font-normal leading-tight"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 'clamp(13px, 1.4vw, 17px)',
                }}
              >
                {pronounsFormatted}
              </span>
            </div>
          </div>

          {/* Photo gallery icon */}
          <button
            type="button"
            className="p-1.5 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Photos"
          >
            <ImageIcon size={24} />
          </button>
        </div>
      </div>

      <div
        className="flex flex-col"
        style={{
          paddingLeft: '40px',
          paddingRight: '40px',
          paddingTop: '66px',
          paddingBottom: 'clamp(100px, 14vh, 130px)',
        }}
      >
        {/* ── CLUB SECTION ── */}
        <div>
          {/* 'CLUB' text — 66px below first section */}
          <p
            className="uppercase tracking-wider text-[#888888] font-normal"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(14px, 2.22vh, 24px)',
              fontWeight: 400,
            }}
          >
            CLUB
          </p>

          {/* Club Member box — implemented same as HomePage with matching badge & integrated progress bar */}
          <div
            style={{
              marginTop: 'clamp(4px, 0.74vh, 8px)',
              height: 'clamp(56px, 8.24vh, 89px)',
              borderRadius: '11px',
              border: '2px solid #BABABA',
              paddingTop: 'clamp(12px, 1.85vh, 20px)',
              paddingLeft: 'clamp(14px, 1.35vw, 26px)',
              paddingRight: 'clamp(14px, 1.35vw, 26px)',
            }}
            className="bg-[#0D0D0D] flex flex-col relative overflow-hidden"
          >
            {/* Left: Club Tier Name, Right: Matching Badge Icon */}
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
                {user.clubTier || 'Bronze Club Member'}
              </span>
              <img
                src={getBadgeImage(user.clubTier)}
                alt={user.clubTier || 'Bronze Club Member'}
                className="select-none object-contain pointer-events-none"
                style={{
                  height: 'clamp(24px, 3.7vh, 40px)',
                  width: 'auto',
                }}
              />
            </div>

            {/* Progress line: enclosed with #BABABA border (2px), height 19px */}
            <div
              className="absolute bottom-0 left-0 right-0 flex bg-black overflow-hidden border-t-2 border-[#BABABA]"
              style={{
                height: 'clamp(12px, 1.76vh, 19px)',
              }}
            >
              {/* White progress line */}
              <div
                className="h-full bg-white"
                style={{
                  width:
                    user.tokens > 0
                      ? `${Math.min(100, Math.round((user.tokens / 50) * 100))}%`
                      : '0%',
                }}
              />
              {/* Remainder is black */}
              <div className="h-full bg-black flex-1" />
            </div>
          </div>

          {/* Immediately below: Coin icon + 50 HVTS.. text */}
          <div
            className="flex items-center gap-2"
            style={{
              marginTop: 'clamp(8px, 1.39vh, 15px)',
            }}
          >
            <span
              style={{
                fontSize: 'clamp(14px, 2.22vh, 24px)',
                lineHeight: 1,
              }}
            >
              🪙
            </span>
            <span
              className="text-white font-semibold uppercase tracking-wider leading-none"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 600,
                fontSize: 'clamp(14px, 2.22vh, 24px)',
                letterSpacing: '0.025em',
              }}
            >
              50 HVTS TO IVORY CLUB
            </span>
          </div>
        </div>

        {/* ── STATS SECTION (Events, Superlatives, HVTs) ── */}
        <div
          style={{
            marginTop: '50px',
            height: '120px',
            borderTop: '1px solid #2D2D2D',
            borderBottom: '1px solid #2D2D2D',
            borderLeft: 'none',
            borderRight: 'none',
          }}
          className="w-full flex items-center justify-around select-none"
        >
          {/* Events */}
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <span
              className="text-white font-bold leading-none"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(20px, 2.6vh, 28px)',
              }}
            >
              0
            </span>
            <span
              className="text-[#AAAAAA] font-normal leading-none"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(13px, 1.5vh, 16px)',
                marginTop: 'clamp(8px, 1vh, 12px)',
              }}
            >
              EVENTS
            </span>
          </div>

          {/* Superlatives */}
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <span
              className="text-white font-bold leading-none"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(20px, 2.6vh, 28px)',
              }}
            >
              0
            </span>
            <span
              className="text-[#AAAAAA] font-normal leading-none"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(13px, 1.5vh, 16px)',
                marginTop: 'clamp(8px, 1vh, 12px)',
              }}
            >
              SUPERLATIVES
            </span>
          </div>

          {/* HVTs */}
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <span
              className="text-white font-bold leading-none"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(20px, 2.6vh, 28px)',
              }}
            >
              {user.tokens ?? 0}
            </span>
            <span
              className="text-[#AAAAAA] font-normal leading-none"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(13px, 1.5vh, 16px)',
                marginTop: 'clamp(8px, 1vh, 12px)',
              }}
            >
              HVTs
            </span>
          </div>
        </div>

        {/* ── SUPERLATIVES SECTION ── */}
        <div style={{ marginTop: '46px' }} className="w-full select-none">
          {/* Heading: Poppins ExtraBold 800, 36px font size, centered */}
          <h2
            className="text-white uppercase text-center"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(24px, 3.33vh, 36px)',
              lineHeight: 1,
              letterSpacing: '0.02em',
            }}
          >
            SUPERLATIVES
          </h2>

          {/* Three boxes with slashed borders, size 568px x 223px, 7px border radius, icons centered */}
          <div
            className="w-full flex items-center justify-between"
            style={{
              marginTop: '60px',
              gap: 'clamp(16px, 3.54vw, 68px)',
            }}
          >
            {/* Box 1: Flame / Fire icon */}
            <div
              className="flex-1 flex items-center justify-center relative"
              style={{
                height: 'clamp(68px, 11.6vw, 223px)',
                maxWidth: '568px',
                borderRadius: '7px',
                backgroundColor: '#151515',
              }}
            >
              {/* Custom dashed border with longer, uncluttered slashes */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <rect
                  x="1"
                  y="1"
                  width="calc(100% - 2px)"
                  height="calc(100% - 2px)"
                  rx="7"
                  ry="7"
                  fill="none"
                  stroke="#5C5C5C"
                  strokeWidth="2"
                  strokeDasharray="16 12"
                />
              </svg>
              <img
                src="/img/superlative_icon_1.png"
                alt="Superlative flame"
                className="object-contain pointer-events-none select-none opacity-80"
                style={{
                  width: 'clamp(20px, 2.5vw, 48px)',
                  height: 'clamp(28px, 3.6vw, 69px)',
                }}
              />
            </div>

            {/* Box 2: Sneaker icon */}
            <div
              className="flex-1 flex items-center justify-center relative"
              style={{
                height: 'clamp(68px, 11.6vw, 223px)',
                maxWidth: '568px',
                borderRadius: '7px',
                backgroundColor: '#151515',
              }}
            >
              {/* Custom dashed border with longer, uncluttered slashes */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <rect
                  x="1"
                  y="1"
                  width="calc(100% - 2px)"
                  height="calc(100% - 2px)"
                  rx="7"
                  ry="7"
                  fill="none"
                  stroke="#5C5C5C"
                  strokeWidth="2"
                  strokeDasharray="16 12"
                />
              </svg>
              <img
                src="/img/superlative_icon_2.png"
                alt="Superlative sneaker"
                className="object-contain pointer-events-none select-none opacity-80"
                style={{
                  width: 'clamp(32px, 4.0vw, 77px)',
                  height: 'clamp(20px, 2.34vw, 45px)',
                }}
              />
            </div>

            {/* Box 3: Arrow right icon */}
            <div
              className="flex-1 flex items-center justify-center relative cursor-pointer group hover:opacity-95 transition-opacity"
              style={{
                height: 'clamp(68px, 11.6vw, 223px)',
                maxWidth: '568px',
                borderRadius: '7px',
                backgroundColor: '#151515',
              }}
            >
              {/* Custom dashed border with longer, uncluttered slashes */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <rect
                  x="1"
                  y="1"
                  width="calc(100% - 2px)"
                  height="calc(100% - 2px)"
                  rx="7"
                  ry="7"
                  fill="none"
                  stroke="#5C5C5C"
                  strokeWidth="2"
                  strokeDasharray="16 12"
                  className="group-hover:stroke-white/60 transition-colors"
                />
              </svg>
              <svg
                viewBox="0 0 48 36"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  width: 'clamp(20px, 2.5vw, 48px)',
                  height: 'clamp(16px, 1.875vw, 36px)',
                }}
              >
                <path d="M4 18h40M27 6l16 12-16 12" />
              </svg>
            </div>
          </div>

          {/* Subtext below the box: Poppins Regular 400, 20px */}
          <p
            className="font-normal"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(14px, 1.85vh, 20px)',
              color: '#777777',
              marginTop: '16px',
            }}
          >
            No Superlatives awarded to you yet
          </p>
        </div>

        {/* ── MEMORIES SECTION ── */}
        <div style={{ marginTop: '60px' }} className="w-full select-none">
          {/* Heading: Poppins ExtraBold 800, 36px font size, horizontally centered */}
          <h2
            className="text-white uppercase text-center"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(24px, 3.33vh, 36px)',
              lineHeight: 1,
              letterSpacing: '0.02em',
            }}
          >
            MEMORIES
          </h2>

          {/* Horizontal stack of boxes: 636px x 632px */}
          <div
            className="w-full flex items-center overflow-x-auto no-scrollbar"
            style={{
              marginTop: '60px',
              gap: '20px',
              paddingBottom: '8px',
            }}
          >
            {/* Box 1: Vibrant gradient background with centered text and pagination dots */}
            <div
              className="flex flex-col items-center justify-center relative overflow-hidden flex-shrink-0 select-none"
              style={{
                width: 'clamp(280px, 33.125vw, 636px)',
                height: 'clamp(280px, 58.5vh, 632px)',
                minWidth: 'clamp(280px, 33.125vw, 636px)',
                borderRadius: '7px',
                background: `
                  radial-gradient(circle at 100% 0%, #6E8460 0%, transparent 45%),
                  radial-gradient(circle at 0% 40%, #E6007A 0%, transparent 55%),
                  radial-gradient(circle at 85% 50%, #FF6400 0%, transparent 60%),
                  radial-gradient(circle at 5% 95%, #0B0210 0%, #15051E 25%, transparent 60%),
                  radial-gradient(circle at 75% 100%, #8E0A1E 0%, transparent 55%),
                  radial-gradient(circle at 0% 0%, #E68298 0%, transparent 45%),
                  linear-gradient(135deg, #D81B60 0%, #F4511E 50%, #880E4F 100%)
                `,
              }}
            >
              {/* Memories show here text */}
              <div
                className="text-white text-center font-bold leading-tight"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 700,
                  fontSize: 'clamp(24px, 3.125vw, 58px)',
                  lineHeight: 1.15,
                }}
              >
                Memories
                <br />
                show here
              </div>

              {/* Three dots at the bottom */}
              <div
                className="absolute flex items-center justify-center gap-1.5 pointer-events-none select-none"
                style={{ bottom: '24px' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />
                <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />
                <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />
              </div>
            </div>

            {/* Box 2: Slashed dashed border with plus inside circle and 'Create Event' */}
            <div
              className="flex flex-col items-center justify-center relative flex-shrink-0 cursor-pointer group hover:bg-[#1c1c1c] transition-colors select-none"
              style={{
                width: 'clamp(280px, 33.125vw, 636px)',
                height: 'clamp(280px, 58.5vh, 632px)',
                minWidth: 'clamp(280px, 33.125vw, 636px)',
                borderRadius: '7px',
                backgroundColor: '#151515',
              }}
            >
              {/* Custom SVG dashed border matching previous boxes */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <rect
                  x="1"
                  y="1"
                  width="calc(100% - 2px)"
                  height="calc(100% - 2px)"
                  rx="7"
                  ry="7"
                  fill="none"
                  stroke="#5C5C5C"
                  strokeWidth="2"
                  strokeDasharray="16 12"
                  className="group-hover:stroke-white/60 transition-colors"
                />
              </svg>

              {/* Plus inside circle icon */}
              <svg
                viewBox="0 0 44 44"
                fill="none"
                stroke="#777777"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:stroke-white/80 transition-colors"
                style={{
                  width: 'clamp(32px, 2.5vw, 48px)',
                  height: 'clamp(32px, 2.5vw, 48px)',
                }}
              >
                <circle cx="22" cy="22" r="18" />
                <path d="M22 14v16M14 22h16" />
              </svg>

              {/* Create Event text */}
              <span
                className="group-hover:text-white/90 transition-colors"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 500,
                  fontSize: 'clamp(14px, 1.85vh, 20px)',
                  color: '#888888',
                  marginTop: '14px',
                }}
              >
                Create Event
              </span>
            </div>
          </div>
        </div>

        {/* ── PASSES SECTION ── */}
        <div style={{ marginTop: '49px' }} className="w-full select-none">
          {/* Heading: Poppins ExtraBold 800, 36px font size, same as MEMORIES heading */}
          <h2
            className="text-white uppercase text-center"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(24px, 3.33vh, 36px)',
              lineHeight: 1,
              letterSpacing: '0.02em',
            }}
          >
            PASSES
          </h2>

          <div
            className="w-full"
            style={{
              marginTop: '62px',
              display: 'flex',
              flexDirection: 'column',
              gap: '50px',
              paddingLeft: 'clamp(12px, 1.25vw, 24px)',
              paddingRight: 'clamp(12px, 1.25vw, 24px)',
            }}
          >
            {/* VIP Passes (Orange dashed border) */}
            <div
              className="relative bg-[#0D0D0D] flex items-center justify-between cursor-pointer hover:bg-[#141414] transition-colors overflow-hidden select-none"
              style={{
                height: 'clamp(120px, 16.76vh, 181px)',
                borderRadius: '15px',
                paddingLeft: 'clamp(20px, 2.13vw, 41px)',
                paddingRight: 'clamp(20px, 2.13vw, 41px)',
              }}
            >
              {/* Custom SVG dashed border: rx="15", strokeDasharray="16 12" */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <rect
                  x="1"
                  y="1"
                  width="calc(100% - 2px)"
                  height="calc(100% - 2px)"
                  rx="15"
                  ry="15"
                  fill="none"
                  stroke="#FB923C"
                  strokeWidth="2"
                  strokeDasharray="16 12"
                />
              </svg>

              <div className="relative z-10">
                <div className="flex items-center gap-3.5">
                  <span
                    className="bg-[#FB923C] text-black font-black flex items-center justify-center rounded-md select-none flex-shrink-0"
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontSize: 'clamp(14px, 1.85vh, 20px)',
                      padding: '4px 10px',
                      letterSpacing: '0.05em',
                      lineHeight: 1,
                    }}
                  >
                    VIP
                  </span>
                  <h3
                    className="text-white leading-none"
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 800,
                      fontSize: 'clamp(24px, 3.33vh, 36px)',
                      lineHeight: 1,
                      letterSpacing: '0.01em',
                    }}
                  >
                    VIP Passes
                  </h3>
                </div>
                <p
                  className="font-normal leading-normal"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 'clamp(15px, 2.0vh, 22px)',
                    color: '#D4D4D4',
                    marginTop: '10px',
                  }}
                >
                  Skip the line at any event
                </p>
              </div>

              <div
                className="relative z-10 rounded-full bg-[#1e1e1e] flex items-center justify-center text-white/70 flex-shrink-0"
                style={{
                  width: 'clamp(44px, 5.5vh, 60px)',
                  height: 'clamp(44px, 5.5vh, 60px)',
                }}
              >
                <ChevronRight size={28} />
              </div>
            </div>

            {/* Invite Passes (Blue dashed border) */}
            <div
              className="relative bg-[#0D0D0D] flex items-center justify-between cursor-pointer hover:bg-[#141414] transition-colors overflow-hidden select-none"
              style={{
                height: 'clamp(120px, 16.76vh, 181px)',
                borderRadius: '15px',
                paddingLeft: 'clamp(20px, 2.13vw, 41px)',
                paddingRight: 'clamp(20px, 2.13vw, 41px)',
              }}
            >
              {/* Custom SVG dashed border: rx="15", strokeDasharray="16 12" */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <rect
                  x="1"
                  y="1"
                  width="calc(100% - 2px)"
                  height="calc(100% - 2px)"
                  rx="15"
                  ry="15"
                  fill="none"
                  stroke="#3164F4"
                  strokeWidth="2"
                  strokeDasharray="16 12"
                />
              </svg>

              <div className="relative z-10">
                <div className="flex items-center gap-3.5">
                  <Mail
                    className="text-[#3164F4] flex-shrink-0"
                    style={{
                      width: 'clamp(26px, 3.33vh, 36px)',
                      height: 'clamp(26px, 3.33vh, 36px)',
                    }}
                  />
                  <h3
                    className="text-white leading-none"
                    style={{
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 800,
                      fontSize: 'clamp(24px, 3.33vh, 36px)',
                      lineHeight: 1,
                      letterSpacing: '0.01em',
                    }}
                  >
                    Invite Passes
                  </h3>
                </div>
                <p
                  className="font-normal leading-normal"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 'clamp(15px, 2.0vh, 22px)',
                    color: '#D4D4D4',
                    marginTop: '10px',
                  }}
                >
                  You have {user.invitePasses} invite passes
                </p>
              </div>

              <div
                className="relative z-10 rounded-full bg-[#1e1e1e] flex items-center justify-center text-white/70 flex-shrink-0"
                style={{
                  width: 'clamp(44px, 5.5vh, 60px)',
                  height: 'clamp(44px, 5.5vh, 60px)',
                }}
              >
                <ChevronRight size={28} />
              </div>
            </div>
          </div>
        </div>

        {/* ── SPOTLIGHT FOR BUSINESS ── */}
        <div style={{ marginTop: '55px' }} className="w-full select-none">
          {/* Heading: Poppins ExtraBold 800, 36px (same size as PASSES heading), left-aligned respecting container padding */}
          <h2
            className="text-white text-left"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 800,
              fontSize: 'clamp(24px, 3.33vh, 36px)',
              lineHeight: 1,
              letterSpacing: '0.01em',
            }}
          >
            Spotlight for Business
          </h2>

          {/* Button: 28px below heading, height 94px, padding top-bottom 34px, border radius 14px, text centered */}
          <button
            type="button"
            className="w-full flex items-center justify-center cursor-pointer hover:opacity-95 transition-opacity select-none shadow-lg"
            style={{
              marginTop: '28px',
              height: 'clamp(64px, 8.7vh, 94px)',
              borderRadius: '14px',
              paddingTop: 'clamp(20px, 3.15vh, 34px)',
              paddingBottom: 'clamp(20px, 3.15vh, 34px)',
              background: 'linear-gradient(90deg, #2674FB 0%, #6913CC 100%)',
            }}
          >
            <span
              className="text-white uppercase leading-none"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(16px, 2.22vh, 24px)',
                letterSpacing: '0.02em',
              }}
            >
              EXTROVERTS SPOTLIGHT
            </span>
          </button>

          {/* Subtext below button */}
          <p
            className="font-normal leading-relaxed"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(15px, 2.0vh, 22px)',
              color: '#888888',
              marginTop: '16px',
            }}
          >
            Own a party place in your city? Get it featured turn your party spot into the city hotspot!
          </p>
        </div>

        {/* ── LOG OUT BUTTON ── */}
        <div style={{ marginTop: 'clamp(36px, 6.3vh, 68px)', marginBottom: '16px' }}>
          <Button
            onClick={handleLogout}
            className="w-full !rounded-[12px] cursor-pointer hover:bg-white/90 transition-colors"
            style={{
              borderRadius: '12px',
              backgroundColor: '#FFFFFF',
              color: '#000000',
              height: 'clamp(52px, 6.5vh, 70px)',
            }}
          >
            <span
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(18px, 2.22vh, 24px)',
                letterSpacing: '0.02em',
              }}
            >
              LOG OUT
            </span>
          </Button>
        </div>
      </div>

      {/* Persistent Bottom Navigation Bar */}
      <BottomNav />
    </div>
  )
}
