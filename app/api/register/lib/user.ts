import prisma from '@/lib/prisma'
import type { RegisterInput, RegisterUser } from './types'
import { hashPassword } from './password'

const toDate = (value: string) => new Date(`${value}T00:00:00.000Z`)

export const createRegisteredUser = async (input: RegisterInput): Promise<RegisterUser | null> => {
	const normalizedEmail = input.email.toLowerCase()
	const existingUser = await prisma.user.findUnique({
		where: { email: normalizedEmail },
	})

	if (existingUser) {
		return null
	}

	const passwordHash = await hashPassword(input.password)
	const parsedDateOfBirth = toDate(input.dateOfBirth)

	return prisma.user.create({
		data: {
			firstName: input.firstName,
			lastName: input.lastName,
			email: normalizedEmail,
			passwordHash,
			dateOfBirth: parsedDateOfBirth,
		},
		select: {
			id: true,
			firstName: true,
			lastName: true,
			email: true,
			dateOfBirth: true,
			createdAt: true,
			updatedAt: true,
		},
	})
}