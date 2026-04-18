import type { NextResponse } from 'next/server'
import { signToken, verifyToken } from '@/lib/security/token'

type SessionTokenPayload = {
	sub: string
	email: string
	firstName: string
	lastName: string
	role: string
}

export type SessionUser = {
	id: string
	email: string
	firstName: string
	lastName: string
	role: string
}

type SessionOptions = {
	keepSignedIn?: boolean
}

type SessionCookieStore = {
	get: (name: string) => { value?: string } | undefined
}

const SESSION_COOKIE_NAME = 'auth_token'
const SHORT_SESSION_DURATION_SECONDS = 60 * 60 * 12
const LONG_SESSION_DURATION_SECONDS = 60 * 60 * 24 * 30

const resolveSessionDuration = (options?: SessionOptions) => {
	return options?.keepSignedIn ? LONG_SESSION_DURATION_SECONDS : SHORT_SESSION_DURATION_SECONDS
}

export const createSessionToken = (user: SessionUser, options?: SessionOptions) => {
	const payload: SessionTokenPayload = {
		sub: user.id,
		email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
		role: user.role,
	}

	const expiresIn = resolveSessionDuration(options)

	return signToken(payload as Record<string, unknown>, {
		expiresInSeconds: expiresIn,
	})
}

export const verifySessionToken = (token: string): SessionUser | null => {
	const decoded = verifyToken<SessionTokenPayload>(token)

	if (!decoded?.sub || !decoded?.email || !decoded?.firstName || !decoded?.lastName || !decoded?.role) {
		return null
	}

	return {
		id: decoded.sub,
		email: decoded.email,
		firstName: decoded.firstName,
		lastName: decoded.lastName,
		role: decoded.role,
	}
}

export const getSessionUserFromCookies = (cookieStore: SessionCookieStore): SessionUser | null => {
	const token = cookieStore.get(getSessionCookieName())?.value

	if (!token) {
		return null
	}

	return verifySessionToken(token)
}

export const setSessionCookie = (response: NextResponse, token: string, options?: SessionOptions) => {
	const cookieOptions = {
		name: SESSION_COOKIE_NAME,
		value: token,
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax' as const,
		path: '/',
	}

	response.cookies.set({
		...cookieOptions,
		...(options?.keepSignedIn ? { maxAge: LONG_SESSION_DURATION_SECONDS } : {}),
	})
}

export const clearSessionCookie = (response: NextResponse) => {
	response.cookies.set({
		name: SESSION_COOKIE_NAME,
		value: '',
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		path: '/',
		maxAge: 0,
	})
}

export const getSessionCookieName = () => SESSION_COOKIE_NAME
