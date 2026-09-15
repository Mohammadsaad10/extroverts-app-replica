import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import WizardLayout from '../../components/WizardLayout'
import { useAuth } from '../../context/AuthContext'

/**
 * NamePage — Screen 8
 * Matches screen8_name_for_party.png:
 *  - "Name, please, for the party check!" heading
 *  - NAME input
 *  - Helper text: "This is the name shown as on members and requests. Cannot be changed later."
 */
export default function NamePage() {
  const navigate = useNavigate()
  const { signupData, updateSignupData } = useAuth()

  const [name, setName] = useState(signupData.name || '')

  const handleNext = () => {
    const trimmed = name.trim()
    if (!trimmed) return
    updateSignupData({ name: trimmed })
    navigate('/signup/age')
  }

  const handleBack = () => {
    navigate('/signup/username')
  }

  return (
    <WizardLayout onNext={handleNext} onBack={handleBack} nextDisabled={!name.trim()}>
      <h1
        className="font-bold text-white leading-tight"
        style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(24px, 3.52vw, 38px)',
        }}
      >
        "Name, please, for the party check!"
      </h1>

      <div
        className="w-full"
        style={{
          marginTop: 'clamp(18px, 2.5vh, 26px)',
        }}
      >
        <label
          htmlFor="name-input"
          className="block uppercase tracking-wider"
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(14px, 1.85vw, 20px)',
            color: '#C5C5C5',
            marginBottom: 'clamp(8px, 1.2vh, 12px)',
          }}
        >
          NAME
        </label>
        <input
          id="name-input"
          type="text"
          maxLength={30}
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        This is the name shown as on members and requests. Cannot be changed later.
      </p>
    </WizardLayout>
  )
}
