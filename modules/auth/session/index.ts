import jwt from 'jsonwebtoken'
import type { NextResponse } from 'next/server'

type SessionTokenPayload = {
	sub: string
	email: string
	firstName: string
	lastName: string
}

export type SessionUser = {
	id: string
	email: string
	firstName: string
	lastName: string
}

type SessionOptions = {
	keepSignedIn?: boolean
}

const SESSION_COOKIE_NAME = 'auth_token'
const SHORT_SESSION_DURATION_SECONDS = 60 * 60 * 12
const LONG_SESSION_DURATION_SECONDS = 60 * 60 * 24 * 30

const resolveSessionDuration = (options?: SessionOptions) => {
	return options?.keepSignedIn ? LONG_SESSION_DURATION_SECONDS : SHORT_SESSION_DURATION_SECONDS
}

const getJwtSecret = () => {
	const secret = process.env.JWT_SECRET

	if (!secret) {
		throw new Error('JWT_SECRET is not set.')
	}

	return secret
}

export const createSessionToken = (user: SessionUser, options?: SessionOptions) => {
	const payload: SessionTokenPayload = {
		sub: user.id,
		email: user.email,
		firstName: user.firstName,
		lastName: user.lastName,
	}

	const expiresIn = resolveSessionDuration(options)

	return jwt.sign(payload, getJwtSecret(), {
		algorithm: 'HS256',
		expiresIn,
	})
}

export const verifySessionToken = (token: string): SessionUser | null => {
	try {
		const decoded = jwt.verify(token, getJwtSecret()) as jwt.JwtPayload & SessionTokenPayload

		if (!decoded?.sub || !decoded?.email || !decoded?.firstName || !decoded?.lastName) {
			return null
		}

		return {
			id: decoded.sub,
			email: decoded.email,
			firstName: decoded.firstName,
			lastName: decoded.lastName,
		}
	} catch {
		return null
	}
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