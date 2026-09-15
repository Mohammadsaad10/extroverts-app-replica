import { useEffect, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

/**
 * BottomSheet — Slide-up modal from the bottom of the screen.
 *
 * From screenshots (used for DOB picker, Pronoun selector, Account popup):
 *  - Dark bg (#1a1a1a)
 *  - Rounded top corners (~24px)
 *  - White drag handle pill at top center (decorative, not draggable)
 *  - Optional close button (✕) top-right
 *  - Optional title in bold uppercase white
 *  - Optional subtitle below title in grey
 *  - Semi-transparent black backdrop overlay
 *  - Content area for any children
 *
 * Animations via Framer Motion:
 *  - Sheet slides up from below viewport
 *  - Backdrop fades in
 *  - Both reverse on close
 */

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  subtitle?: string
  showCloseButton?: boolean
  children: ReactNode
}

export default function BottomSheet({
  isOpen,
  onClose,
  title,
  subtitle,
  showCloseButton = true,
  children,
}: BottomSheetProps) {
  // Lock body scroll when sheet is open while preserving previous style
  useEffect(() => {
    if (!isOpen) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    // Close on Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title || 'Bottom sheet'}
            className="fixed bottom-0 left-0 right-0 z-50 bg-surface-light rounded-t-3xl px-6 pb-8 pt-3 max-h-[85vh] overflow-y-auto"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          >
            {/* Drag handle (decorative) */}
            <div className="flex justify-center mb-4">
              <div className="w-12 h-1.5 rounded-full bg-white/30" />
            </div>

            {/* Header row: title + close button */}
            {(title || showCloseButton) && (
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  {title && (
                    <h2 className="text-lg font-bold uppercase text-white">
                      {title}
                    </h2>
                  )}
                  {subtitle && (
                    <p className="text-sm text-text-secondary mt-1">
                      {subtitle}
                    </p>
                  )}
                </div>

                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="p-1 text-white/60 hover:text-white transition-colors cursor-pointer"
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            )}

            {/* Content */}
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
