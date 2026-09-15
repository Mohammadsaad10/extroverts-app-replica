import { forwardRef, useId, type InputHTMLAttributes } from 'react'

/**
 * Input — Dark-themed text input with optional label and helper text.
 *
 * Style notes confirmed from screenshots:
 *  - Corners are rounded-lg (~8px), NOT rounded-xl — less round than buttons
 *  - Placeholder is uppercase, but regular sm size (not xs)
 *  - No separate label on email page — heading acts as label, placeholder says "EMAIL"
 *  - On username/name/age pages — a small uppercase grey label sits ABOVE the input
 *  - Error state: border turns solid red, no error text shown
 *  - Input bg is transparent black (pure black shows through)
 */

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: boolean
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error = false, helperText, className = '', id: externalId, ...props }, ref) => {
    const generatedId = useId()
    const inputId = externalId || generatedId
    const helperTextId = helperText ? `${inputId}-helper` : undefined

    return (
      <div className="w-full">
        {/* Label — small uppercase grey, shown above input on wizard steps */}
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs uppercase tracking-wider text-text-secondary mb-2"
          >
            {label}
          </label>
        )}

        {/* Input field */}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error || undefined}
          aria-describedby={helperTextId}
          className={`
            w-full bg-transparent py-4 px-4
            rounded-lg text-white text-sm
            border outline-none
            transition-colors duration-200
            placeholder:text-text-muted placeholder:uppercase placeholder:text-sm placeholder:tracking-wider
            ${error
              ? 'border-border-error focus:border-border-error'
              : 'border-border-default focus:border-white/40'
            }
            ${className}
          `}
          {...props}
        />

        {/* Helper text — grey, below input */}
        {helperText && (
          <p
            id={helperTextId}
            className="mt-2 text-xs text-text-secondary leading-relaxed"
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
