export type SocialAuthProviderId = 'google'

export type SocialAuthIntent = 'signin' | 'signup'

export type SocialAuthStartInput = {
	providerId: SocialAuthProviderId
	intent: SocialAuthIntent
	requestOrigin: string
}

export type SocialAuthStartResult =
	| {
			success: true
			authorizationUrl: string
		}
	| {
			success: false
			status: number
			error: string
		}
