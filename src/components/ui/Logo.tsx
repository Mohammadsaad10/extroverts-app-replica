import type { ImgHTMLAttributes } from 'react'

/**
 * Logo — The official E• brand mark extracted directly from the app.
 *
 * Renders /ed0t-white-tight.png (tightly cropped glyph, no transparent margins)
 * with exact #FFFFFF fill.
 *
 * Measured in Figma:
 *  - Standard inner page header (sm): width: 75px, height: 70px
 */

interface LogoProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'w-[clamp(40px,3.9vw,75px)] h-[clamp(38px,6.48vh,70px)]',
  md: 'w-[clamp(60px,5.5vw,100px)] h-[clamp(56px,8.6vh,93px)]',
  lg: 'w-[clamp(90px,8vw,150px)] h-[clamp(84px,13vh,140px)]',
} as const

export default function Logo({ size = 'sm', className = '', style, ...props }: LogoProps) {
  return (
    <img
      src="/ed0t-white-tight.png"
      alt="Extroverts Logo"
      className={`select-none object-contain pointer-events-none ${sizeClasses[size]} ${className}`}
      style={{
        ...style,
      }}
      {...props}
    />
  )
}
