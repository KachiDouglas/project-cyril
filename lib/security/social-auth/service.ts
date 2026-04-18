import { APP_ROUTES, buildAppRoute } from '@/lib/routes'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { SOCIAL_AUTH_PROVIDER_TO_SUPABASE } from './providers'
import type { SocialAuthStartInput, SocialAuthStartResult } from './types'

const resolveNextPath = (intent: SocialAuthStartInput['intent']) => {
	if (intent === 'signup') {
		return APP_ROUTES.dashboard
	}

	return APP_ROUTES.dashboard
}

export const startSocialAuth = async (input: SocialAuthStartInput): Promise<SocialAuthStartResult> => {
	const supabase = createSupabaseServerClient()
	const nextPath = resolveNextPath(input.intent)
	const redirectTo = `${input.requestOrigin}${buildAppRoute(APP_ROUTES.authCallback, { next: nextPath })}`
	const provider = SOCIAL_AUTH_PROVIDER_TO_SUPABASE[input.providerId]

	const { data, error } = await supabase.auth.signInWithOAuth({
		provider,
		options: {
			redirectTo,
		},
	})

	if (error) {
		return {
			success: false,
			status: 503,
			error: error.message || `${input.providerId} social auth is not configured yet.`,
		}
	}

	if (!data?.url) {
		return {
			success: false,
			status: 503,
			error: `${input.providerId} social auth is currently unavailable.`,
		}
	}

	return {
		success: true,
		authorizationUrl: data.url,
	}
}
