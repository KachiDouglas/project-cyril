import { APP_ROUTES } from '@/lib/routes'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	const { searchParams, origin } = new URL(request.url)
	const code = searchParams.get('code')
	let next = searchParams.get('next') ?? APP_ROUTES.home

	if (!next.startsWith('/')) {
		next = APP_ROUTES.home
	}

	if (code) {
		const supabase = createSupabaseServerClient()
		const { error } = await supabase.auth.exchangeCodeForSession(code)

		if (!error) {
			const forwardedHost = request.headers.get('x-forwarded-host')
			const isLocalEnv = process.env.NODE_ENV === 'development'

			if (isLocalEnv) {
				return NextResponse.redirect(`${origin}${next}`)
			}

			if (forwardedHost) {
				return NextResponse.redirect(`https://${forwardedHost}${next}`)
			}

			return NextResponse.redirect(`${origin}${next}`)
		}
	}

	return NextResponse.redirect(`${origin}${APP_ROUTES.authCodeError}`)
}
