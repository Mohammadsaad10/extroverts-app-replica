import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import WizardLayout from '../../components/WizardLayout'
import { useAuth } from '../../context/AuthContext'

/**
 * UsernamePage — Screen 7
 * Matches screen7_enter_username.png:
 *  - "Create a username that fits your vibe!" heading
 *  - USERNAME input
 *  - Helper text: "All your Superlatives and Invites will come your way with this name, so make it unforgettable!"
 */
export default function UsernamePage() {
  const navigate = useNavigate()
  const { signupData, updateSignupData } = useAuth()

  const [username, setUsername] = useState(signupData.username || '')

  const handleNext = () => {
    const trimmed = username.trim()
    if (!trimmed) return
    updateSignupData({ username: trimmed })
    navigate('/signup/name')
  }

  const handleBack = () => {
    navigate('/otp')
  }

  return (
    <WizardLayout onNext={handleNext} onBack={handleBack} nextDisabled={!username.trim()}>
      <h1
        className="font-bold text-white leading-tight"
        style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(24px, 3.52vw, 38px)',
        }}
      >
        Create a username that fits your vibe!
      </h1>

      <div
        className="w-full"
        style={{
          marginTop: 'clamp(18px, 2.5vh, 26px)',
        }}
      >
        <label
          htmlFor="username-input"
          className="block uppercase tracking-wider"
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(14px, 1.85vw, 20px)',
            color: '#C5C5C5',
            marginBottom: 'clamp(8px, 1.2vh, 12px)',
          }}
        >
          USERNAME
        </label>
        <input
          id="username-input"
          type="text"
          maxLength={30}
          value={username}
          onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
          placeholder=""
          className="w-full bg-[#000000] text-white outline-none transition-colors border border-[#3A3A3A] focus:border-[#666666] caret-teal-400"
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: 'clamp(16px, 2.0vw, 22px)',
            height: 'clamp(54px, 6.94vh, 75px)',
            paddingTop: 'clamp(14px, 2.59vh, 28px)',
            paddingBottom: 'clamp(14px, 2.59vh, 28px)',
            paddingLeft: 'clamp(20px, 3.7vw, 40px)',
            paddingRight: 'clamp(20px, 3.7vw, 40px)',
            borderRadius: '13px',
          }}
          autoFocus
        />
      </div>

      <p
        className="font-normal leading-relaxed"
        style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 400,
          fontSize: 'clamp(14px, 1.85vw, 20px)',
          color: '#C5C5C5',
          marginTop: 'clamp(10px, 1.5vh, 16px)',
        }}
      >
        All your Superlatives and Invites will come your way with this name, so make it unforgettable!
      </p>
    </WizardLayout>
  )
}
