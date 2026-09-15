import { useNavigate } from 'react-router-dom'
import { Logo, Button } from '../components/ui'

/**
 * LandingPage — Screen 1
 *
 * Exact measurements applied from Figma (1920x1080 canvas):
 *  - 'AN APP ONLY FOR': font size 24px (cap height 19px)
 *  - 'EXTROVERTS': font size 54px (cap height 41px), letter-spacing: 4.1% (0.041em)
 *  - 'Warning...': font size 25px (cap height 17px)
 *  - Button text ('CONTINUE'): font size 25px (cap height 18px)
 *  - Button border-radius: 4px
 *  - Button dimensions: width 1860px (margins 31px), height 69px, bottom 162px
 *  - Colors: Warning title #D85F61, Warning body #888393, Titles/Logo #FFFFFF, Button bg #FFFFFF, Button text #1E1E1E
 */
export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="relative w-full h-screen min-h-dvh overflow-hidden select-none">
      {/* ── FULL-SCREEN BACKGROUND IMAGE (100% viewport coverage) ── */}
      <picture className="fixed inset-0 w-full h-full pointer-events-none -z-10">
        <source
          media="(orientation: portrait)"
          srcSet="/img/landing-bg-mobile.jpg"
        />
        <img
          src="/img/landing-bg-desktop.jpg"
          alt="Extroverts Background"
          className="w-full h-full object-cover object-center"
        />
      </picture>

      {/* ── TOP ZONE (~30%): Official Extracted Logo in #FFFFFF ── */}
      <div
        className="absolute top-0 left-0 right-0 flex items-end justify-center pointer-events-none"
        style={{ height: '30vh' }}
      >
        <Logo size="lg" />
      </div>

      {/* ── MIDDLE ZONE (~54% - 64%): Title block (#FFFFFF) ── */}
      <div
        className="absolute left-0 right-0 flex flex-col items-center pointer-events-none text-center px-4"
        style={{ top: '54vh' }}
      >
        <p
          className="font-bold uppercase tracking-[0.06em] mb-1"
          style={{
            fontSize: 'clamp(12px, min(3.5vw, 2.25vh), 24px)',
            color: '#FFFFFF',
          }}
        >
          AN APP ONLY FOR
        </p>
        <h1
          className="font-bold uppercase whitespace-nowrap"
          style={{
            fontSize: 'clamp(24px, min(8.2vw, 5.5vh), 58px)',
            letterSpacing: '0.041em',
            color: '#FFFFFF',
          }}
        >
          EXTROVERTS
        </h1>
      </div>

      {/* ── LOWER ZONE: Warning text (font size ~25px, #D85F61 & #888393) ── */}
      <div
        className="absolute left-0 right-0 flex justify-center text-center px-6 pointer-events-none"
        style={{
          bottom: 'calc(clamp(32px, 15vh, 162px) + clamp(48px, 6.39vh, 69px) + clamp(12px, 2.5vh, 28px))',
        }}
      >
        <p
          className="leading-relaxed max-w-5xl"
          style={{
            fontSize: 'clamp(11px, min(3.2vw, 2.31vh), 25px)',
          }}
        >
          <span className="font-semibold" style={{ color: '#D85F61' }}>
            Warning:{' '}
          </span>
          <span style={{ color: '#B2B1C5' }}>
            Entering may lead to spontaneous dancing and unsolicited high-fives!
          </span>
        </p>
      </div>

      {/* 
        ── CONTINUE BUTTON ──
        Background: #FFFFFF
        Text color: #1E1E1E
        Border radius: 4px
        Text font size: ~25px
        Dimensions: width 1860px (margins 31px), height 69px, bottom 162px
      */}
      <div
        className="absolute flex justify-center"
        style={{
          left: 'clamp(16px, 1.61vw, 31px)',
          right: 'clamp(16px, 1.61vw, 31px)',
          bottom: 'clamp(32px, 15vh, 162px)',
        }}
      >
        <Button
          onClick={() => navigate('/terms')}
          className="w-full !rounded-[10px]"
          style={{
            height: 'clamp(48px, 6.39vh, 69px)',
            borderRadius: '4px',
            backgroundColor: '#FFFFFF',
            color: '#1E1E1E',
            fontSize: 'clamp(14px, min(4vw, 2.31vh), 25px)',
            fontWeight: 600,
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
