import { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import WizardLayout from '../../components/WizardLayout'
import { Button } from '../../components/ui'
import Toast from '../../components/ui/Toast'
import { useAuth } from '../../context/AuthContext'

/**
 * AgePage — Screen 9
 * Matches screen9_enter_age.png, screen9_enter_age_dob_popup.png:
 *  - "How many years have you been partying?" heading
 *  - AGE input (tapping opens Date of Birth bottom sheet)
 *  - Date of Birth popup with DD, MM, YYYY and PROCEED
 *  - Calculates age and checks 18+ requirement
 */
export default function AgePage() {
  const navigate = useNavigate()
  const { signupData, updateSignupData } = useAuth()

  const [age, setAge] = useState<number | ''>(signupData.age || '')
  const [showDobSheet, setShowDobSheet] = useState(false)
  const [day, setDay] = useState(signupData.dob ? signupData.dob.split('-')[2] : '')
  const [month, setMonth] = useState(signupData.dob ? signupData.dob.split('-')[1] : '')
  const [year, setYear] = useState(signupData.dob ? signupData.dob.split('-')[0] : '')
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [popupHeight, setPopupHeight] = useState<number>(0)

  const popupRef = useCallback((node: HTMLDivElement | null) => {
    if (node !== null) {
      setPopupHeight(node.offsetHeight)
    }
  }, [])

  const dayRef = useRef<HTMLInputElement>(null)
  const monthRef = useRef<HTMLInputElement>(null)
  const yearRef = useRef<HTMLInputElement>(null)

  const handleDayChange = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 2)
    setDay(cleaned)
    if (cleaned.length === 2) {
      monthRef.current?.focus()
    }
  }

  const handleMonthChange = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 2)
    setMonth(cleaned)
    if (cleaned.length === 2) {
      yearRef.current?.focus()
    }
  }

  const handleYearChange = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 4)
    setYear(cleaned)
  }

  const handleDayKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleDobProceed()
  }

  const handleMonthKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !month) {
      dayRef.current?.focus()
    } else if (e.key === 'Enter') {
      handleDobProceed()
    }
  }

  const handleYearKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !year) {
      monthRef.current?.focus()
    } else if (e.key === 'Enter') {
      handleDobProceed()
    }
  }

  const handleDobProceed = () => {
    const d = parseInt(day, 10)
    const m = parseInt(month, 10)
    const y = parseInt(year, 10)
    const currentYear = new Date().getFullYear()

    if (isNaN(d) || isNaN(m) || isNaN(y) || y < 1920 || y > currentYear || m < 1 || m > 12 || d < 1 || d > 31) {
      setToastMessage('Please enter a valid date of birth')
      return
    }

    // Calculate approximate age
    const today = new Date()
    let computedAge = today.getFullYear() - y
    const birthMonthDiff = today.getMonth() + 1 - m
    if (birthMonthDiff < 0 || (birthMonthDiff === 0 && today.getDate() < d)) {
      computedAge--
    }

    if (computedAge < 18) {
      const formattedDob = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      setAge(computedAge)
      updateSignupData({ age: computedAge, dob: formattedDob })
      setShowDobSheet(false)
      setToastMessage('You must be 18 or older to join Extroverts.')
      return
    }

    const formattedDob = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    setAge(computedAge)
    updateSignupData({ age: computedAge, dob: formattedDob })
    setShowDobSheet(false)
  }

  const handleNext = () => {
    if (!age || age < 18) {
      setToastMessage('You must be 18 or older to join Extroverts.')
      return
    }
    navigate('/signup/pronouns')
  }

  const handleBack = () => {
    navigate('/signup/name')
  }

  return (
    <>
      <WizardLayout onNext={handleNext} onBack={handleBack} nextDisabled={!age || age < 18}>
      <h1
        className="font-bold text-white leading-tight"
        style={{
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 700,
          fontSize: 'clamp(24px, 3.52vw, 38px)',
        }}
      >
        How many years have you been partying?
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
          AGE
        </label>
        <div
          onClick={() => setShowDobSheet(true)}
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
            {age ? age : ''}
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
        We need your age to verify you're eligible and help others know who they're connecting with.
      </p>

    </WizardLayout>

    {/* Date of Birth Bottom Sheet Modal — Rendered at root level for 100% end-to-end width with 0 outer margins */}
    <AnimatePresence>
      {showDobSheet && (
        <>
          {/* Dark Dim Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDobSheet(false)}
          />

          {/* Solid Bottom Sheet Modal - Completely end-to-end (0 outside margin), stuck to bottom */}
          <motion.div
            ref={popupRef}
            role="dialog"
            aria-modal="true"
            aria-label="Date of Birth"
            className="fixed bottom-0 left-0 right-0 w-full z-50 bg-[#121212] rounded-t-[32px] rounded-b-none overflow-hidden shadow-2xl flex flex-col"
            style={{
              paddingTop: 'clamp(36px, 5.55vh, 60px)',
              paddingBottom: 'clamp(16px, 2.31vh, 25px)',
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Decorative top drag handle */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 pointer-events-none">
              <div className="w-12 h-1.5 rounded-full bg-white/30" />
            </div>

            {/* Title row: "DATE OF BIRTH" 60px from top, 53px from left, close sign opposite end */}
            <div
              className="flex items-center justify-between w-full"
              style={{
                paddingLeft: 'clamp(20px, 4.9vw, 53px)',
                paddingRight: 'clamp(20px, 4.9vw, 53px)',
              }}
            >
              <h2
                className="font-bold uppercase text-white"
                style={{
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 600,
                  fontSize: 'clamp(20px, 2.8vw, 32px)',
                  letterSpacing: '0.02em',
                }}
              >
                DATE OF BIRTH
              </h2>
              <button
                type="button"
                onClick={() => setShowDobSheet(false)}
                className="p-1 text-white/70 hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={24} />
              </button>
            </div>

            {/* Boxes: 45px below heading, 63px margin left & right, 14px gap */}
            <div
              className="flex items-center w-full"
              style={{
                marginTop: 'clamp(24px, 4.16vh, 45px)',
                paddingLeft: 'clamp(20px, 5.83vw, 63px)',
                paddingRight: 'clamp(20px, 5.83vw, 63px)',
                gap: '14px',
              }}
            >
              <div className="flex-1">
                <input
                  ref={dayRef}
                  type="text"
                  inputMode="numeric"
                  maxLength={2}
                  value={day}
                  onChange={(e) => handleDayChange(e.target.value)}
                  onKeyDown={handleDayKeyDown}
                  placeholder="DD"
                  className="w-full bg-[#000000] text-center text-white rounded-[13px] border border-[#3A3A3A] outline-none transition-colors focus:border-[#666666] placeholder-[#666666]"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 'clamp(16px, 2.0vw, 22px)',
                    height: 'clamp(52px, 6.67vh, 72px)',
                  }}
                />
              </div>

              <div className="flex-1">
                <input
                  ref={monthRef}
                  type="text"
                  inputMode="numeric"
                  maxLength={2}
                  value={month}
                  onChange={(e) => handleMonthChange(e.target.value)}
                  onKeyDown={handleMonthKeyDown}
                  placeholder="MM"
                  className="w-full bg-[#000000] text-center text-white rounded-[13px] border border-[#3A3A3A] outline-none transition-colors focus:border-[#666666] placeholder-[#666666]"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 'clamp(16px, 2.0vw, 22px)',
                    height: 'clamp(52px, 6.67vh, 72px)',
                  }}
                />
              </div>

              <div className="flex-1">
                <input
                  ref={yearRef}
                  type="text"
                  inputMode="numeric"
                  maxLength={4}
                  value={year}
                  onChange={(e) => handleYearChange(e.target.value)}
                  onKeyDown={handleYearKeyDown}
                  placeholder="YYYY"
                  className="w-full bg-[#000000] text-center text-white rounded-[13px] border border-[#3A3A3A] outline-none transition-colors focus:border-[#666666] placeholder-[#666666]"
                  style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: 'clamp(16px, 2.0vw, 22px)',
                    height: 'clamp(52px, 6.67vh, 72px)',
                  }}
                />
              </div>
            </div>

            {/* PROCEED button: 25px gap below boxes, height 72px, right-left margin 63px, 25px space below */}
            <div
              className="w-full flex flex-col"
              style={{
                marginTop: 'clamp(16px, 2.31vh, 25px)',
                paddingLeft: 'clamp(20px, 5.83vw, 63px)',
                paddingRight: 'clamp(20px, 5.83vw, 63px)',
              }}
            >
              <Button
                onClick={handleDobProceed}
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
                  PROCEED
                </span>
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>

    {/* Toast notification: positioned above the popup when popup is open, or at standard bottom offset */}
    <Toast
      isVisible={toastMessage !== null}
      message={toastMessage || ''}
      type="error"
      onClose={() => setToastMessage(null)}
      bottomOffset={
        showDobSheet
          ? (popupHeight > 0 ? `${popupHeight + 20}px` : 'clamp(300px, 40vh, 360px)')
          : undefined
      }
      zIndex={70}
    />
  </>
  )
}
