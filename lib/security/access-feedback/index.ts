import { buildAppRoute, type RouteQuery } from '@/lib/routes'

export const ACCESS_TOAST_QUERY_KEY = 'accessToast'
export const ACCESS_TOAST_DURATION_MS = 2500

export type AccessToastCode = 'auth_required' | 'unauthorized' | 'guest_only'

export type AccessToastPayload = {
	title: string
	description: string
	variant: 'info' | 'error'
}

export const ACCESS_TOAST_PAYLOADS: Record<AccessToastCode, AccessToastPayload> = {
	auth_required: {
		title: 'Sign in required',
		description: 'Please sign in to access that page.',
		variant: 'info',
	},
	unauthorized: {
		title: 'Access denied',
		description: 'You do not have permission to access that page.',
		variant: 'error',
	},
	guest_only: {
		title: 'Already signed in',
		description: 'This page is only available to guests.',
		variant: 'info',
	},
}

export const withAccessToastQuery = (path: string, code: AccessToastCode, query?: RouteQuery) => {
	return buildAppRoute(path, {
		...query,
		[ACCESS_TOAST_QUERY_KEY]: code,
	})
}

export const parseAccessToastCode = (value: string | null): AccessToastCode | null => {
	if (!value) {
		return null
	}

	if (value === 'auth_required' || value === 'unauthorized' || value === 'guest_only') {
		return value
	}

	return null
}
