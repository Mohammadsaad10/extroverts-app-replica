import type { ReactNode } from 'react'
import { Logo, Button } from './ui'

interface WizardLayoutProps {
  children: ReactNode
  onNext: () => void
  onBack: () => void
  nextLabel?: string
  nextDisabled?: boolean
  nextLoading?: boolean
}

/**
 * WizardLayout — Shell for Screens 7 through 11.
 * Matches screenshots:
 *  - E• logo on left end (70 x 68px, 112px from top)
 *  - "GETTING READY" on right end on the same line
 *  - Margins: 64px left & right
 *  - Content area with 99px gap below logo
 *  - Two action buttons at the bottom: NEXT (primary) + BACK (secondary)
 */
export default function WizardLayout({
  children,
  onNext,
  onBack,
  nextLabel = 'NEXT',
  nextDisabled = false,
  nextLoading = false,
}: WizardLayoutProps) {
  return (
    <div
      className="min-h-dvh bg-black text-white relative select-none flex flex-col justify-between overflow-y-auto"
      style={{
        paddingLeft: 'clamp(20px, 3.33vw, 64px)',
        paddingRight: 'clamp(20px, 3.33vw, 64px)',
        paddingTop: 'clamp(30px, 6.85vh, 74px)',
        paddingBottom: 'clamp(32px, 6.85vh, 75px)',
      }}
    >
      <div>
        {/* Header: E• logo on left, "GETTING READY" on right */}
        <header className="w-full flex items-center justify-between">
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

        {/* Content area — shifted slightly upwards */}
        <main
          className="w-full"
          style={{
            marginTop: 'clamp(28px, 6.2vh, 68px)',
          }}
        >
          {children}
        </main>
      </div>

      {/* Bottom CTA Buttons */}
      <footer
        className="w-full flex flex-col"
        style={{
          marginTop: 'clamp(32px, 5.0vh, 60px)',
          gap: 'clamp(12px, 1.85vh, 20px)',
        }}
      >
        {/* NEXT / SIGN UP */}
        <Button
          onClick={onNext}
          disabled={nextDisabled}
          loading={nextLoading}
          className="w-full !rounded-[12px]"
          style={{
            borderRadius: '12px',
            backgroundColor: '#FFFFFF',
            color: nextDisabled ? '#AAAAAA' : '#000000',
            height: 'clamp(50px, 6.02vh, 67px)',
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
            {nextLabel}
          </span>
        </Button>

        {/* BACK */}
        <Button
          variant="secondary"
          onClick={onBack}
          className="w-full !rounded-[12px]"
          style={{
            borderRadius: '12px',
            height: 'clamp(50px, 6.02vh, 67px)',
            border: '1px solid #FFFFFF',
            backgroundColor: 'transparent',
            color: '#FFFFFF',
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
      </footer>
    </div>
  )
}
