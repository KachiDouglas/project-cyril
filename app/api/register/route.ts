import { NextResponse } from 'next/server'
import { createSessionToken, setSessionCookie } from '@/modules/auth/session'
import { createRegisteredUser } from './lib/user'
import { readRegisterPayload } from './lib/request'
import { validateRegisterPayload } from './lib/validation'

export async function POST(request: Request) {
	try {
		const payload = await readRegisterPayload(request)
		const validationResult = validateRegisterPayload(payload)

		if (!validationResult.success) {
			return NextResponse.json({ error: validationResult.error }, { status: 400 })
		}

		const user = await createRegisteredUser(validationResult.data)

		if (!user) {
			return NextResponse.json({ error: 'A user with this email already exists.' }, { status: 409 })
		}

		const token = createSessionToken({
			id: user.id,
			email: user.email,
			firstName: user.firstName,
			lastName: user.lastName,
		})

		const response = NextResponse.json(
			{
				message: 'User created successfully.',
				user,
			},
			{ status: 201 }
		)

		setSessionCookie(response, token)

		return response
	} catch (error) {
		console.error('Register route error:', error)

		return NextResponse.json({ error: 'Failed to create user.' }, { status: 500 })
	}
}
