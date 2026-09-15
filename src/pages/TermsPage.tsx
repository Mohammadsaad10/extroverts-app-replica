import { useNavigate } from 'react-router-dom'
import { Logo, Button } from '../components/ui'

/**
 * TermsPage — Screen 2
 *
 * Exact specs applied from Figma:
 *  - Logo E•: 75px x 70px, position 113px from top, 64px from left
 *  - Manifesto paragraph: Poppins, Extra Bold (800), 32px font size, position 354px from top, 62px left/right margin
 *    'PARTY' in #A855F7, rest in #FFFFFF
 *  - "To proceed..." text: Poppins, Regular (400), 20px font size
 *    'To proceed, accept ' in #737373, 'Terms and Conditions' in #FFFFFF
 *  - Vertical gap: exactly 33px between 'To proceed, accept Terms and Conditions' and button
 *  - Button:
 *    - Position: 162px from bottom, 62px margins left/right
 *    - Border-radius: 10px
 *    - Padding: 27px top/bottom, auto left/right
 *    - Button text: 'ACCEPT', Poppins, Medium (500), 24px font size, color #000000
 *    - Background: #FFFFFF
 */
export default function TermsPage() {
  const navigate = useNavigate()

  return (
    <div
      className="relative w-full min-h-dvh flex flex-col justify-between select-none bg-black overflow-y-auto"
      style={{
        paddingLeft: 'clamp(20px, 3.23vw, 62px)',
        paddingRight: 'clamp(20px, 3.23vw, 62px)',
        paddingTop: 'clamp(40px, 10.46vh, 113px)',
        paddingBottom: 'clamp(32px, 15vh, 162px)',
      }}
    >
      <div>
        {/* ── Logo E• at top-left corner ── */}
        <div className="flex items-center">
          <Logo size="sm" />
        </div>

        {/* ── Manifesto text block ── */}
        <div
          style={{
            marginTop: 'clamp(32px, 15.8vh, 171px)',
          }}
        >
          <p
            className="font-extrabold uppercase leading-[1.28]"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(15px, min(4.2vw, 2.96vh), 32px)',
              color: '#FFFFFF',
            }}
          >
            BY USING THIS APP, YOU’RE AGREEING TO KEEP THINGS FUN, SAFE, AND
            RESPECTFUL... AND ALSO AGREEING TO OUR TERMS AND CONDITIONS.
            POLITENESS IS A MUST—TREAT OTHERS HOW YOU’D WANT TO BE TREATED.
            EVERYONE HERE IS LOOKING FOR REASONS TO{' '}
            <span style={{ color: '#A855F7' }}>PARTY</span>, SO BRING YOUR BEST
            VIBE AND EXPECT THE SAME FROM OTHERS. LET’S PARTY RESPONSIBLY AND
            MAKE EVERY EXPERIENCE A GREAT ONE!
          </p>
        </div>
      </div>

      {/* ── LOWER SECTION: Notice + Button with exact 33px vertical gap ── */}
      <div
        style={{
          marginTop: 'clamp(24px, 5vh, 60px)',
        }}
      >
        {/* "To proceed, accept Terms and Conditions" */}
        <p
          className="font-normal"
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(12px, min(2.8vw, 1.85vh), 20px)',
            color: '#737373',
            marginBottom: 'clamp(16px, 3.05vh, 33px)',
          }}
        >
          To proceed, accept{' '}
          <span className="font-normal" style={{ color: '#FFFFFF' }}>
            Terms and Conditions
          </span>
        </p>

        {/* ACCEPT Button */}
        <Button
          onClick={() => navigate('/location')}
          className="w-full !rounded-[10px] !font-semibold"
          style={{
            borderRadius: '10px',
            backgroundColor: '#FFFFFF',
            color: '#000000',
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(15px, min(3.2vw, 2.22vh), 24px)',
            fontWeight: 600,
            paddingTop: 'clamp(14px, 2.5vh, 27px)',
            paddingBottom: 'clamp(14px, 2.5vh, 27px)',
            lineHeight: 1.2,
          }}
        >
          Accept
        </Button>
      </div>
    </div>
  )
}
