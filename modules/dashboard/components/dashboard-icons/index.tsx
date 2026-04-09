import type { ReactNode } from 'react'

type IconProps = {
  className?: string
}

const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '1.7',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export const BrandHexagonIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 32 32" className={className} xmlns="http://www.w3.org/2000/svg" {...strokeProps}>
    <path d="M16 3.5 26.2 9.4v11.8L16 27.1 5.8 21.2V9.4L16 3.5Z" />
    <path d="M12.2 12.6 16 10.4l3.8 2.2v4.4L16 19.2l-3.8-2.2v-4.4Z" />
  </svg>
)

export const DashboardIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" {...strokeProps}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
)

export const AssessmentIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" {...strokeProps}>
    <path d="M7 4.5h7.3L19 9.2v10.3A2.5 2.5 0 0 1 16.5 22h-9A2.5 2.5 0 0 1 5 19.5v-13A2 2 0 0 1 7 4.5Z" />
    <path d="M14.3 4.5v4.7H19" />
    <path d="M8 13.5h8" />
    <path d="M8 17h8" />
  </svg>
)

export const CasesIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" {...strokeProps}>
    <path d="M8 7V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" />
    <rect x="4" y="7" width="16" height="13" rx="2" />
    <path d="M4 12h16" />
  </svg>
)

export const ScreeningIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" {...strokeProps}>
    <circle cx="11" cy="11" r="5.5" />
    <path d="m16 16 3.5 3.5" />
  </svg>
)

export const RiskDomainIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" {...strokeProps}>
    <path d="M12 3 20 7.5v9L12 21 4 16.5v-9L12 3Z" />
    <path d="M12 8v4" />
    <circle cx="12" cy="15.5" r="1" fill="currentColor" stroke="none" />
  </svg>
)

export const DesistanceIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" {...strokeProps}>
    <path d="M4 12a8 8 0 1 0 3-6.2" />
    <path d="M5 4.8v4.7h4.7" />
  </svg>
)

export const AnalyticsIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" {...strokeProps}>
    <path d="M4 20V4" />
    <path d="M4 20h16" />
    <path d="M8 16v-5" />
    <path d="M12 16V7" />
    <path d="M16 16v-3" />
  </svg>
)

export const SummaryUsersIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" {...strokeProps}>
    <circle cx="9" cy="8" r="3" />
    <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
    <circle cx="17" cy="10" r="2.5" />
    <path d="M14.6 20a4.5 4.5 0 0 1 7 0" />
  </svg>
)

export const WarningIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" {...strokeProps}>
    <path d="M12 4 21 19H3L12 4Z" />
    <path d="M12 9.2v4.2" />
    <circle cx="12" cy="16.5" r="1" fill="currentColor" stroke="none" />
  </svg>
)

export const CompletedIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" {...strokeProps}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="m8.5 12.5 2.2 2.2 4.9-5.4" />
  </svg>
)

export const ProgressIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" {...strokeProps}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7v5l3 2" />
  </svg>
)

export const SearchIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" {...strokeProps}>
    <circle cx="11" cy="11" r="5.5" />
    <path d="m16 16 4 4" />
  </svg>
)

export const FilterIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" {...strokeProps}>
    <path d="M4.5 6h15l-5.8 6.2v4.4l-3.4 1.8v-6.2L4.5 6Z" />
  </svg>
)

export const EyeIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" {...strokeProps}>
    <path d="M2 12c2.5-4 5.8-6 10-6s7.5 2 10 6c-2.5 4-5.8 6-10 6s-7.5-2-10-6Z" />
    <circle cx="12" cy="12" r="2.5" />
  </svg>
)

export const PlusIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" {...strokeProps}>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
)

export const LogoutIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" {...strokeProps}>
    <path d="M10 5H6.5A2.5 2.5 0 0 0 4 7.5v9A2.5 2.5 0 0 0 6.5 19H10" />
    <path d="M14 8l4 4-4 4" />
    <path d="M18 12H10" />
  </svg>
)

export const UserCircleIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" {...strokeProps}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="10" r="2.5" />
    <path d="M7.8 18a6.5 6.5 0 0 1 8.4 0" />
  </svg>
)

export type DashboardIconComponent = (props: IconProps) => ReactNode