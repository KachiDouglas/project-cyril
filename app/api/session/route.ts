import { clearSessionCookie, getSessionCookieName, verifySessionToken } from '@/lib/security/session'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
	const token = request.cookies.get(getSessionCookieName())?.value

	if (!token) {
		return NextResponse.json({ authenticated: false, user: null }, { status: 200 })
	}

	const user = verifySessionToken(token)

	if (!user) {
		const response = NextResponse.json({ authenticated: false, user: null }, { status: 200 })
		clearSessionCookie(response)
		return response
	}

	return NextResponse.json({ authenticated: true, user }, { status: 200 })
}

export async function DELETE() {
	const response = NextResponse.json({ message: 'Logged out successfully.' }, { status: 200 })
	clearSessionCookie(response)
	return response
}