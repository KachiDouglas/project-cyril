import { APP_ROUTES, buildAppRoute } from '@/lib/routes'
import { withAccessToastQuery } from '@/lib/security/access-feedback'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getSessionUserFromCookies } from './index'

type RequireAuthenticatedUserOptions = {
	redirectTo?: string
	nextPathname?: string
}

export const requireAuthenticatedUser = async (options?: RequireAuthenticatedUserOptions) => {
	const sessionUser = getSessionUserFromCookies(await cookies())

	if (!sessionUser) {
		const fallbackPath = options?.redirectTo ?? APP_ROUTES.login
		const baseDestination = options?.nextPathname
			? buildAppRoute(fallbackPath, { next: options.nextPathname })
			: fallbackPath
		const destination = withAccessToastQuery(baseDestination, 'auth_required')

		redirect(destination)
	}

	return sessionUser
}
