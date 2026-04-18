import { getGoogleSocialAuthRoute } from '@/lib/routes'
import type { SocialAuthIntent, SocialAuthProviderId } from '@/lib/security/social-auth/types'

type BeginSocialAuthResult =
	| {
			success: true
			authorizationUrl: string
		}
	| {
			success: false
			error: string
		}

export const beginSocialAuth = async (
	providerId: SocialAuthProviderId,
	intent: SocialAuthIntent
): Promise<BeginSocialAuthResult> => {
	try {
		const response = await fetch(getGoogleSocialAuthRoute(), {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ intent }),
		})

		const payload = (await response.json()) as { authorizationUrl?: string; error?: string }

		if (!response.ok || !payload.authorizationUrl) {
			return {
				success: false,
				error: payload.error ?? 'Unable to start social authentication.',
			}
		}

		return {
			success: true,
			authorizationUrl: payload.authorizationUrl,
		}
	} catch {
		return {
			success: false,
			error: 'Unable to start social authentication.',
		}
	}
}
