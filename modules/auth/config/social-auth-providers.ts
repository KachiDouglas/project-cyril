import type { SocialAuthProviderId } from '@/lib/security/social-auth/types'

export type SocialAuthProvider = {
	id: SocialAuthProviderId
	label: string
}

export const SOCIAL_AUTH_PROVIDERS: SocialAuthProvider[] = [
	{ id: 'google', label: 'Google' },
]
