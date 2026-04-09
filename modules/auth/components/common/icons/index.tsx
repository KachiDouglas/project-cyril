import React from 'react'

type IconProps = {
  className?: string
}

export const ShieldIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      d="M12 3L18 5.5V11.7C18 16 15.35 19.98 12 21C8.65 19.98 6 16 6 11.7V5.5L12 3Z"
      stroke="white"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
)

export const MailIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M4 7L12 13L20 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
  </svg>
)

export const LockIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.6" />
    <path d="M8 11V8.75C8 6.68 9.68 5 11.75 5C13.82 5 15.5 6.68 15.5 8.75V11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
)

export const EyeIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M2 12C4.6 7.9 8 5.75 12 5.75C16 5.75 19.4 7.9 22 12C19.4 16.1 16 18.25 12 18.25C8 18.25 4.6 16.1 2 12Z" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.6" />
  </svg>
)