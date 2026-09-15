import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Logo, Button } from '../../components/ui'
import { useAuth } from '../../context/AuthContext'

/**
 * InvitePage — Screen 11 & Screen 11 (2)
 * Matches screen11_invite_code.png & screen11_invite_code_2.png:
 *  - Sticky logo div at top: 54px left/right padding
 *  - Scrollable middle content: 63px left/right padding
 *  - Slogans text: Poppins Semi-Bold 600, 32px font size, 97px below logo, 20px gap
 *  - INVITE CODE label: 43px below text, 20px Poppins Regular #C5C5C5
 *  - Input box: slight breathing space (12px), 84px height, 13px radius
 *  - Fixed bottom sheet: 350px height, 50px left/right padding, 75px top, 100px bottom
 *  - Buttons: 72px height, 25px gap
 */
export default function InvitePage() {
  const navigate = useNavigate()
  const { signupData, updateSignupData, completeSignup } = useAuth()

  const [inviteCode, setInviteCode] = useState(signupData.inviteCode || '')
  const [isSigningUp, setIsSigningUp] = useState(false)

  const handleSignUp = () => {
    setIsSigningUp(true)
    updateSignupData({ inviteCode: inviteCode.trim() })

    setTimeout(() => {
      completeSignup()
      navigate('/home')
    }, 600)
  }

  const handleBack = () => {
    navigate('/signup/pronouns')
  }

  return (
    <div className="h-screen w-full bg-black text-white relative flex flex-col overflow-hidden select-none">
      {/* 1. Header (Logo Div) — Sticked to the top */}
      <header
        className="fixed top-0 left-0 right-0 z-30 bg-black flex items-center justify-between"
        style={{
          paddingLeft: 'clamp(20px, 2.81vw, 54px)',
          paddingRight: 'clamp(20px, 2.81vw, 54px)',
          paddingTop: 'clamp(30px, 6.85vh, 74px)',
          paddingBottom: '16px',
        }}
      >
        <div className="flex items-center">
          <Logo
            style={{
              width: 'clamp(48px, 3.65vw, 70px)',
              height: 'clamp(46px, 6.30vh, 68px)',
            }}
          />
        </div>

        <span
          className="font-bold uppercase tracking-wider text-white select-none"
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(16px, 1.94vw, 22px)',
            letterSpacing: '0.04em',
          }}
        >
          GETTING READY
        </span>
      </header>

      {/* 2. Middle Content — Scrollable between sticky header and bottom sheet */}
      <main
        className="flex-1 w-full overflow-y-auto overflow-x-hidden no-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        style={{
          paddingTop: 'clamp(125px, 19vh, 215px)',
          paddingBottom: 'clamp(320px, 38vh, 400px)',
          paddingLeft: 'clamp(20px, 3.28vw, 63px)',
          paddingRight: 'clamp(20px, 3.28vw, 63px)',
        }}
      >
        {/* Slogans text: Poppins Semi-Bold 600, 32px, tight gap so input box is clearly visible */}
        <div
          className="flex flex-col uppercase tracking-wide leading-[1.18] select-none w-full"
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            fontSize: 'clamp(18px, 1.67vw, 32px)',
            gap: 'clamp(3px, 0.55vh, 6px)',
          }}
        >
          <p className="text-white" style={{ opacity: 1.0 }}>
            KINDNESS = GOOD <span className="text-[#8B5CF6]">HAIR</span> DAY
          </p>
          <p className="text-white" style={{ opacity: 0.88 }}>
            SIP IN? <span className="text-[#8B5CF6]">CHIP</span> IN.
          </p>
          <p className="text-white" style={{ opacity: 0.78 }}>
            GHOSTING IS FOR <span className="text-[#8B5CF6]">HALLOWEEN</span>.
          </p>
          <p className="text-white" style={{ opacity: 0.68 }}>
            OUTFITS LOUD, <span className="text-[#8B5CF6]">INTENTIONS</span> CLEAR.
          </p>
          <p className="text-white" style={{ opacity: 0.58 }}>
            JOINING? FREE. HOSTING? <span className="text-[#8B5CF6]">ALSO</span> FREE.
          </p>
          <p className="text-white" style={{ opacity: 0.50 }}>
            EARLLY IS <span className="text-[#8B5CF6]">ICONIC</span>.
          </p>
          <p className="text-white" style={{ opacity: 0.44 }}>
            YES. <span className="text-[#8B5CF6]">SPELLING</span> MISTAKE.
          </p>
        </div>

        {/* INVITE CODE label & input: clearly visible above bottom sheet */}
        <div
          className="w-full"
          style={{
            marginTop: 'clamp(16px, 2.4vh, 28px)',
          }}
        >
          <label
            htmlFor="invite-code-input"
            className="block tracking-wider"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(14px, 1.85vw, 20px)',
              color: '#777777',
            }}
          >
            ENTER INVITE CODE (Optional)
          </label>

          {/* Input box: slight breathing space, height 84px */}
          <input
            id="invite-code-input"
            type="text"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
            placeholder=""
            className="w-full bg-[#000000] text-white outline-none transition-colors border border-[#3A3A3A] focus:border-[#666666] caret-teal-400"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(16px, 2.0vw, 22px)',
              height: 'clamp(60px, 7.78vh, 84px)',
              marginTop: 'clamp(8px, 1.11vh, 12px)',
              paddingLeft: 'clamp(20px, 3.7vw, 40px)',
              paddingRight: 'clamp(20px, 3.7vw, 40px)',
              borderRadius: '13px',
            }}
          />

          {/* Helper text below input */}
          <p
            className="font-normal leading-relaxed"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(14px, 1.85vw, 20px)',
              color: '#777777',
              marginTop: 'clamp(10px, 1.5vh, 16px)',
            }}
          >
            Enter invite code and get up to +30 HVTs!
          </p>
        </div>
      </main>

      {/* 3. Bottom Sheet — Fixed at bottom, height 350px */}
      <div
        className="fixed bottom-0 left-0 right-0 z-20 bg-black flex flex-col justify-start"
        style={{
          height: 'clamp(280px, 32.4vh, 350px)',
          paddingTop: 'clamp(40px, 6.94vh, 75px)',
          paddingBottom: 'clamp(50px, 9.25vh, 100px)',
          paddingLeft: 'clamp(20px, 2.6vw, 50px)',
          paddingRight: 'clamp(20px, 2.6vw, 50px)',
        }}
      >
        <div
          className="w-full flex flex-col"
          style={{
            gap: 'clamp(16px, 2.31vh, 25px)',
          }}
        >
          {/* SIGN UP Button: 72px height */}
          <Button
            onClick={handleSignUp}
            loading={isSigningUp}
            className="w-full !rounded-[12px]"
            style={{
              borderRadius: '12px',
              backgroundColor: '#FFFFFF',
              color: '#000000',
              height: 'clamp(52px, 6.67vh, 72px)',
            }}
          >
            <span
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 500,
                fontSize: 'clamp(16px, 1.8vw, 22px)',
                letterSpacing: '0.02em',
              }}
            >
              SIGN UP
            </span>
          </Button>

          {/* BACK Button: 72px height */}
          <Button
            onClick={handleBack}
            variant="secondary"
            className="w-full !rounded-[12px]"
            style={{
              borderRadius: '12px',
              backgroundColor: '#000000',
              borderColor: '#FFFFFF',
              color: '#FFFFFF',
              height: 'clamp(52px, 6.67vh, 72px)',
            }}
          >
            <span
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 500,
                fontSize: 'clamp(16px, 1.8vw, 22px)',
                letterSpacing: '0.02em',
              }}
            >
              BACK
            </span>
          </Button>
        </div>
      </div>
    </div>
  )
}
