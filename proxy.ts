import { APP_ROUTES, buildAppRoute, getAppRouteAccess } from '@/lib/routes'
import { withAccessToastQuery } from '@/lib/security/access-feedback'
import { getSessionCookieName } from '@/lib/security/session'
import { NextResponse, type NextRequest } from 'next/server'

export const proxy = (request: NextRequest) => {
	const pathname = request.nextUrl.pathname
	const routeAccess = getAppRouteAccess(pathname)

	if (routeAccess === 'public') {
		return NextResponse.next()
	}

	const hasSessionCookie = Boolean(request.cookies.get(getSessionCookieName())?.value)

	if (routeAccess === 'protected' && !hasSessionCookie) {
		const loginUrl = new URL(
			withAccessToastQuery(APP_ROUTES.login, 'auth_required', { next: pathname }),
			request.url
		)

		return NextResponse.redirect(loginUrl)
	}

	if (routeAccess === 'guest-only' && hasSessionCookie) {
		const homeUrl = new URL(withAccessToastQuery(APP_ROUTES.home, 'guest_only'), request.url)
		return NextResponse.redirect(homeUrl)
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}
