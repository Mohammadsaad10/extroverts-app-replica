import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import WizardLayout from '../../components/WizardLayout'
import { useAuth } from '../../context/AuthContext'

const PRONOUN_OPTIONS = ['he', 'him', 'his', 'she', 'her', 'hers', 'they', 'them']

/**
 * PronounsPage — Screen 10
 * Matches screen10_pronoun.png, screen10_pronoun_popup.png:
 *  - "Which pronouns feel right for you?" heading
 *  - PRONOUNS input (tapping opens Select Pronouns bottom sheet)
 *  - Pronouns multi-select sheet (up to 3 selections with checkboxes)
 */
export default function PronounsPage() {
  const navigate = useNavigate()
  const { signupData, updateSignupData } = useAuth()

  const [selectedPronouns, setSelectedPronouns] = useState<string[]>(
    signupData.pronouns || []
  )
  const [showSheet, setShowSheet] = useState(false)

  const togglePronoun = (item: string) => {
    if (selectedPronouns.includes(item)) {
      setSelectedPronouns(selectedPronouns.filter((p) => p !== item))
    } else {
      if (selectedPronouns.length >= 3) return // Maximum 3
      setSelectedPronouns([...selectedPronouns, item])
    }
  }

  const handleNext = () => {
    updateSignupData({ pronouns: selectedPronouns })
    navigate('/signup/invite')
  }

  const handleBack = () => {
    navigate('/signup/age')
  }

  const displayString = selectedPronouns.join(' / ')

  return (
    <>
      <WizardLayout onNext={handleNext} onBack={handleBack} nextDisabled={selectedPronouns.length === 0}>
      <h1
        className="font-bold text-white leading-tight"
        style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(24px, 3.52vw, 38px)',
        }}
      >
        Which pronouns feel right for you?
      </h1>

      <div
        className="w-full"
        style={{
          marginTop: 'clamp(18px, 2.5vh, 26px)',
        }}
      >
        <label
          className="block uppercase tracking-wider"
          style={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 400,
            fontSize: 'clamp(14px, 1.85vw, 20px)',
            color: '#C5C5C5',
            marginBottom: 'clamp(8px, 1.2vh, 12px)',
          }}
        >
          PRONOUNS
        </label>
        <div
          onClick={() => setShowSheet(true)}
          className="w-full bg-[#000000] text-white flex items-center border border-[#3A3A3A] cursor-pointer hover:border-[#666666] transition-colors"
          style={{
            height: 'clamp(54px, 6.94vh, 75px)',
            paddingTop: 'clamp(14px, 2.59vh, 28px)',
            paddingBottom: 'clamp(14px, 2.59vh, 28px)',
            paddingLeft: 'clamp(20px, 3.7vw, 40px)',
            paddingRight: 'clamp(20px, 3.7vw, 40px)',
            borderRadius: '13px',
          }}
        >
          <span
            className="text-white font-medium"
            style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: 'clamp(16px, 2.0vw, 22px)',
            }}
          >
            {displayString ? displayString : ''}
          </span>
        </div>
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
        Select the pronouns that feel right for you.
      </p>

    </WizardLayout>

    {/* Pronouns Selection Bottom Sheet — Rendered outside WizardLayout for 100% end-to-end coverage */}
    <AnimatePresence>
      {showSheet && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSheet(false)}
          />

          {/* Solid Bottom Sheet Modal - Stuck to bottom, not glassy, end to end */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Select Pronouns"
            className="fixed bottom-0 left-0 right-0 w-full z-50 bg-[#121212] rounded-t-[32px] rounded-b-none overflow-y-auto shadow-2xl flex flex-col"
            style={{
              maxHeight: '90vh',
              paddingTop: 'clamp(36px, 5.55vh, 60px)',
              paddingBottom: 'clamp(20px, 3.5vh, 38px)',
              paddingLeft: 'clamp(24px, 2.5vw, 48px)',
              paddingRight: 'clamp(24px, 2.5vw, 48px)',
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Top drag handle */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 pointer-events-none">
              <div className="w-12 h-1.5 rounded-full bg-white/30" />
            </div>

            {/* Title row: "SELECT PRONOUNS" 60px from top, close icon at opposite end of this div */}
            <div className="flex items-center justify-between w-full">
              <h2
                className="uppercase text-white"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600,
                  fontSize: 'clamp(20px, 2.6vw, 32px)',
                  letterSpacing: '0.02em',
                }}
              >
                SELECT PRONOUNS
              </h2>

              <button
                type="button"
                onClick={() => setShowSheet(false)}
                className="p-1 text-white/70 hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>

            {/* Subheading/instruction: slightly increased size */}
            <p
              className="text-[#888888]"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(15px, 1.65vw, 19px)',
                marginTop: 'clamp(8px, 1.3vh, 14px)',
              }}
            >
              Select upto 3
            </p>

            {/* Pronoun Checkbox List: adjusted spacing so 'them' is fully visible */}
            <div
              className="flex flex-col w-full"
              style={{
                marginTop: 'clamp(24px, 4.6vh, 48px)',
                gap: 'clamp(12px, 2.1vh, 22px)',
              }}
            >
              {PRONOUN_OPTIONS.map((option) => {
                const isChecked = selectedPronouns.includes(option)
                return (
                  <div
                    key={option}
                    onClick={() => togglePronoun(option)}
                    className="flex items-center gap-3.5 cursor-pointer select-none"
                  >
                    {/* Custom Checkbox: solid white when checked, border when unchecked */}
                    <div
                      className={`w-6 h-6 rounded-[7px] transition-all flex-shrink-0 ${
                        isChecked
                          ? 'bg-white'
                          : 'border border-[#444444] bg-transparent'
                      }`}
                    />

                    <span
                      className={`transition-colors ${
                        isChecked ? 'font-medium text-white' : 'font-normal text-[#8E8E93]'
                      }`}
                      style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontSize: 'clamp(17px, 1.8vw, 22px)',
                      }}
                    >
                      {option}
                    </span>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  </>
  )
}
