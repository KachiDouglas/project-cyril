import type { SocialAuthProviderId } from './types'
import type { Provider } from '@supabase/supabase-js'

export const isSocialAuthProviderId = (value: string): value is SocialAuthProviderId => {
	return value === 'google'
}

export const SOCIAL_AUTH_PROVIDER_TO_SUPABASE: Record<SocialAuthProviderId, Provider> = {
	google: 'google',
}
