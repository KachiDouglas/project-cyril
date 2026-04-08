import type { RegisterPayload } from './types'

const readJsonPayload = async (request: Request): Promise<RegisterPayload> => {
	try {
		return (await request.json()) as RegisterPayload
	} catch {
		return {}
	}
}

const readFormPayload = async (request: Request): Promise<RegisterPayload> => {
	const formData = await request.formData()

	return {
		firstName: formData.get('firstName')?.toString(),
		lastName: formData.get('lastName')?.toString(),
		email: formData.get('email')?.toString(),
		password: formData.get('password')?.toString(),
		dateOfBirth: formData.get('dateOfBirth')?.toString(),
	}
}

export const readRegisterPayload = async (request: Request): Promise<RegisterPayload> => {
	const contentType = request.headers.get('content-type') ?? ''

	if (contentType.includes('application/json')) {
		return readJsonPayload(request)
	}

	return readFormPayload(request)
}