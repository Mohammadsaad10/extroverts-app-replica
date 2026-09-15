import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X } from 'lucide-react'

export interface ToastProps {
  isVisible: boolean
  message: string
  type?: 'success' | 'error' | 'info'
  onClose: () => void
  duration?: number
  bottomOffset?: string
  zIndex?: number
}

/**
 * Toast — Floating white pill toast at the bottom of the screen.
 * Exactly replicates the toasts seen in screenshots:
 *  - screen6_enter_otp_wrong_otp.png: white card, orange cross circle, black bold text
 *  - screen12_singup_successful_toast.png: white card, green check box, black bold text
 */
export default function Toast({
  isVisible,
  message,
  type = 'success',
  onClose,
  duration = 3000,
  bottomOffset,
  zIndex = 70,
}: ToastProps) {
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!isVisible) return
    const timer = setTimeout(() => {
      onCloseRef.current?.()
    }, duration)
    return () => clearTimeout(timer)
  }, [isVisible, duration])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed left-0 right-0 flex justify-center pointer-events-none"
          style={{
            zIndex,
            bottom: bottomOffset || 'clamp(24px, 5.09vh, 55px)',
            paddingLeft: 'clamp(20px, 3.33vw, 64px)',
            paddingRight: 'clamp(20px, 3.33vw, 64px)',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
        >
          <div
            role="alert"
            aria-live="assertive"
            onClick={() => onCloseRef.current?.()}
            className="w-full bg-white text-black shadow-2xl flex items-center gap-4 pointer-events-auto cursor-pointer select-none active:scale-[0.99] transition-transform"
            style={{
              fontFamily: 'Poppins, sans-serif',
              borderRadius: '12px',
              minHeight: 'clamp(52px, 6.76vh, 73px)',
              paddingLeft: 'clamp(20px, 2.5vw, 36px)',
              paddingRight: 'clamp(20px, 2.5vw, 36px)',
              paddingTop: 'clamp(14px, 1.8vh, 22px)',
              paddingBottom: 'clamp(14px, 1.8vh, 22px)',
            }}
          >
            {/* Icon */}
            {type === 'success' ? (
              <div className="w-6 h-6 rounded-md border-2 border-[#10B981] flex items-center justify-center flex-shrink-0 text-[#10B981]">
                <Check size={16} strokeWidth={3} />
              </div>
            ) : (
              <div className="w-6 h-6 rounded-full border-2 border-[#F97316] flex items-center justify-center flex-shrink-0 text-[#F97316]">
                <X size={14} strokeWidth={3} />
              </div>
            )}

            {/* Message */}
            <span
              className="font-semibold text-black leading-snug"
              style={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: 'clamp(14px, 1.5vw, 18px)',
              }}
            >
              {message}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
