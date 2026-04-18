'use client'

import Button from '@/modules/common/components/buttons'
import { SOCIAL_AUTH_PROVIDERS, type SocialAuthProvider } from '@/modules/auth/config/social-auth-providers'

type SocialAuthButtonsProps = {
	intentLabel: 'Sign in' | 'Create account'
	onProviderClick?: (provider: SocialAuthProvider) => void
	disabled?: boolean
}

const GoogleIcon = () => (
	<svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
		<path fill="#EA4335" d="M12 10.2v3.9h5.4c-.24 1.26-.96 2.33-2.04 3.05l3.3 2.56c1.92-1.77 3.03-4.38 3.03-7.5 0-.72-.06-1.41-.2-2.08H12z" />
		<path fill="#34A853" d="M12 22c2.73 0 5.03-.9 6.7-2.45l-3.3-2.56c-.9.61-2.04.98-3.4.98-2.6 0-4.81-1.76-5.6-4.13l-3.4 2.62A10.02 10.02 0 0 0 12 22z" />
		<path fill="#FBBC05" d="M6.4 13.84A6 6 0 0 1 6.08 12c0-.64.12-1.26.32-1.84l-3.4-2.62A10 10 0 0 0 2 12c0 1.63.39 3.17 1.08 4.46l3.32-2.62z" />
		<path fill="#4285F4" d="M12 5.98c1.5 0 2.85.52 3.91 1.53l2.93-2.93C17.02 2.88 14.73 2 12 2 8.1 2 4.74 4.24 3.08 7.54l3.4 2.62c.79-2.37 3-4.18 5.52-4.18z" />
	</svg>
)

const MicrosoftIcon = () => (
	<svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
		<rect x="3" y="3" width="8.5" height="8.5" fill="#F25022" />
		<rect x="12.5" y="3" width="8.5" height="8.5" fill="#7FBA00" />
		<rect x="3" y="12.5" width="8.5" height="8.5" fill="#00A4EF" />
		<rect x="12.5" y="12.5" width="8.5" height="8.5" fill="#FFB900" />
	</svg>
)

const GitHubIcon = () => (
	<svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
		<path d="M12 2A10 10 0 0 0 8.84 21.5c.5.1.66-.21.66-.48v-1.69c-2.77.6-3.35-1.18-3.35-1.18-.45-1.14-1.1-1.44-1.1-1.44-.9-.62.07-.61.07-.61 1 .07 1.53 1.02 1.53 1.02.88 1.5 2.32 1.07 2.88.82.09-.64.35-1.07.63-1.31-2.21-.25-4.53-1.1-4.53-4.9 0-1.08.39-1.96 1.03-2.65-.1-.25-.45-1.28.1-2.67 0 0 .84-.27 2.75 1.01A9.5 9.5 0 0 1 12 6.84c.85 0 1.7.12 2.5.35 1.9-1.28 2.74-1.01 2.74-1.01.56 1.4.21 2.42.1 2.67.64.7 1.03 1.57 1.03 2.65 0 3.81-2.33 4.64-4.55 4.88.36.31.68.93.68 1.88v2.76c0 .27.17.59.67.48A10 10 0 0 0 12 2z" />
	</svg>
)

const getProviderIcon = (providerId: SocialAuthProvider['id']) => {
	if (providerId === 'google') {
		return <GoogleIcon />
	}

	if (providerId === 'microsoft') {
		return <MicrosoftIcon />
	}

	return <GitHubIcon />
}

const SocialAuthButtons = ({ intentLabel, onProviderClick, disabled = false }: SocialAuthButtonsProps) => {
	return (
		<div className="space-y-2.5" aria-label="Social authentication options">
			{SOCIAL_AUTH_PROVIDERS.map((provider) => (
				<Button
					key={provider.id}
					type="button"
					variant="secondary"
					fullWidth
					maxWidth={530}
					disabled={disabled}
					leftIcon={getProviderIcon(provider.id)}
					onClick={() => onProviderClick?.(provider)}
				>
					{`${intentLabel} with ${provider.label}`}
				</Button>
			))}
		</div>
	)
}

export default SocialAuthButtons
