export type RegisterPayload = {
	firstName?: string
	lastName?: string
	role?: string
	email?: string
	password?: string
	dateOfBirth?: string
}

export type RegisterInput = {
	firstName: string
	lastName: string
	role: string
	email: string
	password: string
	dateOfBirth: string
}

export type RegisterUser = {
	id: string
	firstName: string
	lastName: string
	role: string
	email: string
	dateOfBirth: Date
	createdAt: Date
	updatedAt: Date
}