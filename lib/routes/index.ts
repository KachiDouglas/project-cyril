type RouteQueryValue = string | number | boolean | null | undefined

export const APP_ROUTES = {
	home: '/',
	dashboard: '/dashboard',
	login: '/login',
	register: '/register',
} as const

export const API_ROUTES = {
	login: '/api/login',
	register: '/api/register',
	session: '/api/session',
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