import argon2 from 'argon2'
import type { PasswordHasher } from '../types'

export const createArgon2PasswordHasher = (): PasswordHasher => {
	return {
		hash: async (password: string) => {
			return argon2.hash(password)
		},

		verify: async (password: string, storedHash: string) => {
			try {
				return await argon2.verify(storedHash, password)
			} catch {
				return false
			}
		},
	}
}
