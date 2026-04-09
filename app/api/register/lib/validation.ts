import type { RegisterInput, RegisterPayload } from './types'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const toTrimmedString = (value: string | undefined) => value?.trim() ?? ''

export const validateRegisterPayload = (
	payload: RegisterPayload
): { success: true; data: RegisterInput } | { success: false; error: string } => {
	const firstName = toTrimmedString(payload.firstName)
	const lastName = toTrimmedString(payload.lastName)
	const role = toTrimmedString(payload.role)
	const email = toTrimmedString(payload.email).toLowerCase()
	const password = payload.password?.trim() ?? ''
	const dateOfBirth = toTrimmedString(payload.dateOfBirth)

	if (!firstName || !lastName || !role || !email || !password || !dateOfBirth) {
		return {
			success: false,
			error: 'firstName, lastName, role, email, password, and dateOfBirth are required.',
		}
	}

	if (firstName.length < 2) {
		return {
			success: false,
			error: 'firstName must be at least 2 characters long.',
		}
	}

	if (lastName.length < 2) {
		return {
			success: false,
			error: 'lastName must be at least 2 characters long.',
		}
	}

	if (role.length < 2) {
		return {
			success: false,
			error: 'role must be at least 2 characters long.',
		}
	}

	if (!emailPattern.test(email)) {
		return {
			success: false,
			error: 'email must be a valid email address.',
		}
	}

	if (password.length < 8) {
		return {
			success: false,
			error: 'password must be at least 8 characters long.',
		}
	}

	const parsedDateOfBirth = new Date(`${dateOfBirth}T00:00:00.000Z`)

	if (Number.isNaN(parsedDateOfBirth.getTime())) {
		return {
			success: false,
			error: 'dateOfBirth must be a valid date.',
		}
	}

	if (parsedDateOfBirth > new Date()) {
		return {
			success: false,
			error: 'dateOfBirth cannot be in the future.',
		}
	}

	return {
		success: true,
		data: {
			firstName,
			lastName,
			role,
			email,
			password,
			dateOfBirth,
		},
	}
}