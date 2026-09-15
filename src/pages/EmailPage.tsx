import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import { Logo, Button } from '../components/ui'
import { useAuth } from '../context/AuthContext'

/**
 * EmailPage — Screen 5
 * Refined to exact Figma positions:
 *  - Screen margins: 57px left and right
 *  - 'E' logo: 98px from top, 57px from left, 73 x 68px
 *  - 'Enter your email' label: 268px from top (102px below logo)
 *  - Email input: 345px from top (respecting 57px margins, end-to-end width)
 *  - Button: 35px below input, end-to-end width
 *  - Subscription checkbox: 28px below button
 */
export default function EmailPage() {
  const navigate = useNavigate()
  const { signupData, updateSignupData } = useAuth()

  const [email, setEmail] = useState(signupData.email || '')
  const [subscribed, setSubscribed] = useState(signupData.subscribedToNewsletter ?? false)
  const [hasError, setHasError] = useState(false)

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      setHasError(true)
      return
    }

    setHasError(false)
    updateSignupData({ email: email.trim(), subscribedToNewsletter: subscribed })
    navigate('/otp')
  }

  return (
    <div
      className="min-h-dvh bg-black text-white relative select-none flex flex-col"
      style={{
        paddingLeft: 'clamp(20px, 5.28vw, 57px)',
        paddingRight: 'clamp(20px, 5.28vw, 57px)',
        paddingTop: 'clamp(36px, 9.07vh, 98px)',
      }}
    >
      {/* 'E' Logo — 98px from top, 57px from left, size: 73 x 68px */}
      <div className="w-full flex items-center">
        <Logo
          style={{
            width: 'clamp(46px, 6.76vw, 73px)',
            height: 'clamp(42px, 6.30vh, 68px)',
          }}
        />
      </div>

      {/* 'Enter your email' label — 268px from top (102px gap from bottom of logo) */}
      <div
        style={{
          marginTop: 'clamp(36px, 9.44vh, 102px)',
        }}
      >
        <h1
          className="font-semibold text-white leading-tight"
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 600,
            fontSize: 'clamp(22px, 3.33vw, 36px)',
          }}
        >
          Enter your email
        </h1>
      </div>

      {/* Form section */}
      <form onSubmit={handleSubmit} className="w-full">
        {/* Email input field — 345px from top (occupying all width between 57px margins) */}
        <div
          style={{
            marginTop: 'clamp(18px, 3.42vh, 37px)',
          }}
        >
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (hasError) setHasError(false)
            }}
            placeholder="EMAIL"
            className={`w-full bg-[#000000] text-white outline-none transition-colors placeholder-[#3A3A3A] ${hasError
              ? 'border border-[#EF4444]'
              : 'border border-[#3A3A3A] focus:border-[#666666]'
              }`}
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(16px, 2.0vw, 22px)',
              lineHeight: '1.2',
              height: 'clamp(54px, 6.94vh, 75px)',
              paddingTop: 'clamp(14px, 2.59vh, 28px)',
              paddingBottom: 'clamp(14px, 2.59vh, 28px)',
              paddingLeft: 'clamp(20px, 3.7vw, 40px)',
              paddingRight: 'clamp(20px, 3.7vw, 40px)',
              borderRadius: '13px',
            }}
            autoComplete="email"
            autoFocus
          />
        </div>

        {/* PROCEED Button — 35px below input, end-to-end width */}
        <div
          style={{
            marginTop: 'clamp(18px, 3.24vh, 35px)',
          }}
        >
          <Button
            type="submit"
            className="w-full !rounded-[10px]"
            style={{
              borderRadius: '10px',
              backgroundColor: '#FFFFFF',
              color: '#000000',
              height: 'clamp(50px, 6.2vh, 67px)',
            }}
          >
            <span
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 500,
                fontSize: 'clamp(16px, 2.0vw, 22px)',
                letterSpacing: '0.02em',
              }}
            >
              PROCEED
            </span>
          </Button>
        </div>

        {/* Newsletter Checkbox — 28px below button */}
        <div
          style={{
            marginTop: 'clamp(16px, 2.59vh, 28px)',
          }}
        >
          <label className="flex items-center gap-3 cursor-pointer select-none max-w-full">
            <div
              onClick={() => setSubscribed(!subscribed)}
              className={`w-[24px] h-[24px] rounded-[7px] border flex items-center justify-center transition-colors cursor-pointer flex-shrink-0 ${
                subscribed
                  ? 'border-white bg-white text-black'
                  : 'border-[#555555] bg-transparent'
              }`}
            >
              {subscribed && <Check size={16} strokeWidth={2.8} />}
            </div>
            <span
              className="font-normal flex-1 min-w-0 leading-snug"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 400,
                fontSize: 'clamp(12px, 1.6vw, 20px)',
                color: '#F7F7F7',
              }}
              onClick={() => setSubscribed(!subscribed)}
            >
              I'd like to subscribe to your newsletter
            </span>
          </label>
        </div>
      </form>
    </div>
  )
}
