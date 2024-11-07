import Link from 'next/link'
import { TNextLinkButtonProps } from './types'

export function NextLinkButton({
  href,
  disabled,
  children,
  className,
}: TNextLinkButtonProps) {
  return (
    <Link href={href} passHref>
      <button
        className={`mt-6 bg-blue-500 text-white py-2 px-4 rounded ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
        disabled={disabled}
        aria-disabled={disabled}
      >
        {children}
      </button>
    </Link>
  )
}
