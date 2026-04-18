type RouteQueryValue = string | number | boolean | null | undefined

export const APP_ROUTES = {
	home: '/',
	dashboard: '/dashboard',
	login: '/login',
	register: '/register',
	authCallback: '/auth/callback',
	authCodeError: '/auth/auth-code-error',
} as const

export type AppRouteAccess = 'public' | 'protected' | 'guest-only'

export const APP_ROUTE_ACCESS: Record<(typeof APP_ROUTES)[keyof typeof APP_ROUTES], AppRouteAccess> = {
	[APP_ROUTES.home]: 'public',
	[APP_ROUTES.dashboard]: 'protected',
	[APP_ROUTES.login]: 'guest-only',
	[APP_ROUTES.register]: 'guest-only',
	[APP_ROUTES.authCallback]: 'public',
	[APP_ROUTES.authCodeError]: 'public',
}

export const API_ROUTES = {
	login: '/api/login',
	register: '/api/register',
	session: '/api/session',
	socialAuthGoogle: '/api/auth/social/google',
} as const

export type RouteQuery = Record<string, RouteQueryValue>

export const buildAppRoute = (path: string, query?: RouteQuery) => {
	if (!query) {
		return path
	}

	const searchParams = new URLSearchParams()

	for (const [key, value] of Object.entries(query)) {
		if (value === undefined || value === null) {
			continue
		}

		searchParams.set(key, String(value))
	}

	const queryString = searchParams.toString()

	return queryString ? `${path}?${queryString}` : path
}

const normalizePath = (pathname: string) => {
	if (pathname.length > 1 && pathname.endsWith('/')) {
		return pathname.slice(0, -1)
	}

	return pathname
}

const matchesRoute = (pathname: string, route: string) => {
	const normalizedPath = normalizePath(pathname)
	const normalizedRoute = normalizePath(route)

	if (normalizedPath === normalizedRoute) {
		return true
	}

	return normalizedPath.startsWith(`${normalizedRoute}/`)
}

export const getAppRouteAccess = (pathname: string): AppRouteAccess => {
	const matchedEntry = Object.entries(APP_ROUTE_ACCESS).find(([route]) => {
		return matchesRoute(pathname, route)
	})

	if (!matchedEntry) {
		return 'public'
	}

	return matchedEntry[1]
}

export const getGoogleSocialAuthRoute = () => API_ROUTES.socialAuthGoogle