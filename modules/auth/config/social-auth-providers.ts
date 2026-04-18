export type SocialAuthProviderId = 'google' | 'microsoft' | 'github'

export type SocialAuthProvider = {
	id: SocialAuthProviderId
	label: string
}

export const SOCIAL_AUTH_PROVIDERS: SocialAuthProvider[] = [
	{ id: 'google', label: 'Google' },
	{ id: 'microsoft', label: 'Microsoft' },
	{ id: 'github', label: 'GitHub' },
]
