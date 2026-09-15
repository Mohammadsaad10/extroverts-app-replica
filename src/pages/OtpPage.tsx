import { useState, useRef, useEffect, type KeyboardEvent, type ClipboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Info } from 'lucide-react'
import { Logo, Button } from '../components/ui'
import Toast from '../components/ui/Toast'
import { useAuth } from '../context/AuthContext'

/**
 * OtpPage — Screen 6
 * Matches screen6_enter_otp.png, screen6_enter_otp_wrong_otp.png, etc.:
 *  - Centered E• logo (98px from top, 73 x 68px)
 *  - Screen margins: 57px left and right
 *  - "ENTER OTP" label
 *  - 6 full-width underline cells (dots when empty, large digits when filled)
 *  - "Resend in Xs" / "Resend OTP" right-aligned below 6th cell
 *  - VERIFY button (white, 10px rounded, spoke spinner on loading)
 *  - GO BACK button (transparent with white 1px border, 10px rounded)
 *  - Helper text: "ⓘ A 6-digit OTP has been sent to {email}."
 *  - Floating toast for errors matching screenshots
 */
export default function OtpPage() {
  const navigate = useNavigate()
  const { signupData, updateSignupData } = useAuth()

  const [digits, setDigits] = useState(['', '', '', '', '', ''])
  const [isVerifying, setIsVerifying] = useState(false)
  const [resendSeconds, setResendSeconds] = useState(30)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Resend countdown timer — re-runs only when resendSeconds resets to 30 (from 0)
  useEffect(() => {
    if (resendSeconds <= 0) return
    const timer = setInterval(() => {
      setResendSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [resendSeconds > 0]) // only re-run when switching between active/inactive

  const handleDigitChange = (index: number, val: string) => {
    const cleaned = val.replace(/\D/g, '')
    if (!cleaned) {
      const newDigits = [...digits]
      newDigits[index] = ''
      setDigits(newDigits)
      return
    }

    const char = cleaned.slice(-1)
    const newDigits = [...digits]
    newDigits[index] = char
    setDigits(newDigits)

    // Auto-focus next field
    if (index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
    } else if (e.key === 'Enter') {
      handleVerify()
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (!pasted) return

    const newDigits = [...digits]
    for (let i = 0; i < pasted.length; i++) {
      newDigits[i] = pasted[i]
    }
    setDigits(newDigits)

    const nextIndex = Math.min(pasted.length, 5)
    inputRefs.current[nextIndex]?.focus()
  }

  const handleResend = () => {
    if (resendSeconds > 0) return
    setResendSeconds(30)
  }

  const handleVerify = () => {
    const enteredOtp = digits.join('')

    if (enteredOtp.length < 6) {
      setToastMessage('Please enter all 6 digits')
      return
    }

    // TODO: Remove before production — Demo error trigger for testing
    if (import.meta.env.DEV && enteredOtp === '000000') {
      setToastMessage('Verification failed. Please try again.')
      return
    }

    setIsVerifying(true)
    updateSignupData({ otp: enteredOtp })

    setTimeout(() => {
      setIsVerifying(false)
      navigate('/signup/username')
    }, 900)
  }

  const emailDisplay = signupData.email || 'your@email.com'

  return (
    <div
      className="min-h-dvh bg-black text-white relative select-none flex flex-col"
      style={{
        paddingLeft: 'clamp(20px, 3.33vw, 64px)',
        paddingRight: 'clamp(20px, 3.33vw, 64px)',
        paddingTop: 'clamp(40px, 10.37vh, 112px)',
      }}
    >
      {/* Centered 'E•' Logo — 112px from top in 1080p, size: 70 x 68px */}
      <div className="w-full flex justify-center items-center">
        <Logo
          style={{
            width: 'clamp(48px, 3.65vw, 70px)',
            height: 'clamp(46px, 6.30vh, 68px)',
          }}
        />
      </div>

      {/* Main OTP Container */}
      <div
        className="w-full"
        style={{
          marginTop: 'clamp(36px, 9.16vh, 99px)',
        }}
      >
        {/* "ENTER OTP" Label */}
        <p
          className="uppercase tracking-wider text-white font-medium"
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(17px, 2.0vw, 24px)',
            letterSpacing: '0.04em',
          }}
        >
          ENTER OTP
        </p>

        {/* 6 Underline Digit Cells — Stretches full-width end-to-end */}
        <div
          className="w-full flex items-end justify-between gap-[clamp(8px,1.56vw,17px)]"
          style={{
            marginTop: 'clamp(14px, 2.96vh, 32px)',
          }}
        >
          {digits.map((digit, idx) => (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center cursor-pointer relative"
              onClick={() => inputRefs.current[idx]?.focus()}
            >
              <input
                ref={(el) => {
                  inputRefs.current[idx] = el
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleDigitChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                onPaste={handlePaste}
                className="w-full bg-transparent text-center font-bold text-white outline-none caret-transparent"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: 'clamp(18px, 2.2vw, 30px)',
                  lineHeight: '32px',
                  height: '32px',
                  marginBottom: 'clamp(8px, 1.85vh, 20px)',
                }}
                autoFocus={idx === 0}
              />

              {/* Dot placeholder when empty */}
              {!digit && (
                <div
                  className="absolute pointer-events-none text-white text-xl leading-none select-none flex items-center justify-center"
                  style={{
                    top: '6px',
                  }}
                >
                  •
                </div>
              )}

              {/* Bottom solid underline bar */}
              <div className="w-full h-[2.5px] bg-white transition-colors" />
            </div>
          ))}
        </div>

        {/* Resend Link (right aligned under 6th digit) */}
        <div
          className="flex justify-end"
          style={{
            marginTop: 'clamp(12px, 2.78vh, 30px)',
          }}
        >
          {resendSeconds > 0 ? (
            <span
              className="text-[#777777] font-normal"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(12px, 1.3vw, 15px)',
              }}
            >
              Resend in {resendSeconds}s
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              className="text-[#777777] hover:text-white transition-colors cursor-pointer font-normal"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(12px, 1.3vw, 15px)',
              }}
            >
              Resend OTP
            </button>
          )}
        </div>

        {/* CTA Buttons */}
        <div
          className="flex flex-col w-full"
          style={{
            marginTop: 'clamp(28px, 6.0vh, 66px)',
          }}
        >
          {/* VERIFY */}
          <Button
            onClick={handleVerify}
            loading={isVerifying}
            className="w-full !rounded-[12px]"
            style={{
              borderRadius: '12px',
              backgroundColor: '#FFFFFF',
              color: '#000000',
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
              VERIFY
            </span>
          </Button>

          {/* GO BACK */}
          <Button
            variant="secondary"
            onClick={() => navigate('/email')}
            className="w-full !rounded-[12px]"
            style={{
              marginTop: 'clamp(14px, 2.2vh, 24px)',
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
              GO BACK
            </span>
          </Button>
        </div>

        {/* Info Helper Note */}
        <div
          className="flex items-center gap-1.5"
          style={{
            marginTop: 'clamp(16px, 2.4vh, 26px)',
          }}
        >
          <Info size={15} className="text-[#666666] flex-shrink-0" />
          <p
            className="text-[#666666] font-normal leading-snug"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(11px, 1.2vw, 14px)',
            }}
          >
            A 6-digit OTP has been sent to {emailDisplay}.
          </p>
        </div>
      </div>

      <div className="pb-8" />

      {/* Floating error toast */}
      <Toast
        isVisible={toastMessage !== null}
        message={toastMessage || ''}
        type="error"
        onClose={() => setToastMessage(null)}
      />
    </div>
  )
}
