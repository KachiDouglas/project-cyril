import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { createSessionToken, setSessionCookie } from '@/modules/auth/session'
import { pbkdf2 as pbkdf2Callback, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'

const pbkdf2 = promisify(pbkdf2Callback)

type LoginPayload = {
	email?: string
	password?: string
	keepSignedIn?: boolean | string
}

const parseKeepSignedIn = (value: LoginPayload['keepSignedIn']) => {
	if (typeof value === 'boolean') {
		return value
	}

	if (typeof value === 'string') {
		const normalized = value.trim().toLowerCase()
		return normalized === 'true' || normalized === '1' || normalized === 'on' || normalized === 'yes'
	}

	return false
}

const readPayload = async (request: Request): Promise<LoginPayload> => {
	const contentType = request.headers.get('content-type') ?? ''

	if (contentType.includes('application/json')) {
		try {
			return (await request.json()) as LoginPayload
		} catch {
			return {}
		}
	}

	const formData = await request.formData()

	return {
		email: formData.get('email')?.toString(),
		password: formData.get('password')?.toString(),
		keepSignedIn: formData.get('keepSignedIn')?.toString(),
	}
}

const verifyPassword = async (password: string, storedHash: string) => {
	const [salt, hash] = storedHash.split(':')

	if (!salt || !hash) {
		return false
	}

	const derivedKey = (await pbkdf2(password, salt, 310000, 32, 'sha512')) as Buffer
	const expected = Buffer.from(hash, 'hex')
	const actual = Buffer.from(derivedKey.toString('hex'), 'hex')

	if (expected.length !== actual.length) {
		return false
	}

	return timingSafeEqual(expected, actual)
}

export async function POST(request: Request) {
	try {
		const payload = await readPayload(request)
		const email = payload.email?.trim().toLowerCase()
		const password = payload.password?.trim()
		const keepSignedIn = parseKeepSignedIn(payload.keepSignedIn)

		if (!email || !password) {
			return NextResponse.json({ error: 'email and password are required.' }, { status: 400 })
		}

		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		})

		if (!user) {
			return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
		}

		const isValidPassword = await verifyPassword(password, user.passwordHash)

		if (!isValidPassword) {
			return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
		}

		const token = createSessionToken(
			{
			id: user.id,
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
			},
			{ keepSignedIn }
		)

		const response = NextResponse.json(
			{
				message: 'Login successful.',
				user: {
					id: user.id,
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
				},
			},
			{ status: 200 }
		)

		setSessionCookie(response, token, { keepSignedIn })

		return response
	} catch (error) {
		console.error('Login route error:', error)

		return NextResponse.json({ error: 'Failed to login.' }, { status: 500 })
	}
}