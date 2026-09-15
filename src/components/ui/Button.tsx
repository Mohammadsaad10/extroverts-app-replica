import type { ButtonHTMLAttributes, ReactNode } from 'react'

/**
 * Button — Primary and Secondary variants.
 *
 * From screenshots:
 *  PRIMARY  → white bg, black text  (CONTINUE, PROCEED, VERIFY, NEXT, SIGN UP, GET STARTED)
 *  SECONDARY → black bg, white 1px border, white text  (BACK, GO BACK, MAYBE LATER)
 *
 * Style notes confirmed from screenshots:
 *  - Corners are PILL shape (rounded-full), not rounded-xl
 *  - Font is bold (700), not semibold (600)
 *  - Spinner in app is a rotating asterisk/snowflake pattern, not a border-spin
 */

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  loading?: boolean
  children: ReactNode
}

export default function Button({
  variant = 'primary',
  loading = false,
  disabled = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading

  const base =
    'w-full min-h-[48px] rounded-xl md:rounded-2xl text-sm md:text-base font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center cursor-pointer select-none'

  const variants = {
    primary: isDisabled
      ? 'bg-white text-gray-400 cursor-not-allowed'
      : 'bg-white text-black hover:bg-gray-100 active:scale-[0.98]',
    secondary: isDisabled
      ? 'bg-transparent border border-gray-600 text-gray-500 cursor-not-allowed'
      : 'bg-transparent border border-white text-white hover:bg-white/5 active:scale-[0.98]',
  }

  return (
    <button
      type="button"
      className={`${base} ${variants[variant]} ${className}`}
      disabled={isDisabled}
      {...props}
    >
      {loading ? <Spinner /> : children}
    </button>
  )
}

/**
 * Spinner — 31px stationary radial spoke loader.
 * The SVG itself remains stationary; spokes fade sequentially to create the motion illusion.
 */
function Spinner() {
  const count = 8
  return (
    <svg
      className="h-[31px] w-[31px]"
      viewBox="0 0 31 31"
      fill="none"
      role="status"
      aria-label="Loading"
    >
      {Array.from({ length: count }).map((_, i) => {
        const angle = i * (360 / count)
        const delay = -((count - i) * (0.8 / count))
        return (
          <rect
            key={i}
            x="13.75"
            y="2"
            width="3.5"
            height="7.5"
            rx="1.75"
            fill="currentColor"
            transform={`rotate(${angle} 15.5 15.5)`}
            style={{
              animation: 'spoke-fade 0.8s linear infinite',
              animationDelay: `${delay}s`,
            }}
          />
        )
      })}
    </svg>
  )
}
