import { createArgon2PasswordHasher } from './providers/argon'
import { createPbkdf2PasswordHasher } from './providers/pbkdf2'
import type { PasswordHasher } from './types'

let activePasswordHasher: PasswordHasher | null = null
let activePasswordProviderName: PasswordProviderName | null = null

const PASSWORD_PROVIDERS = {
	pbkdf2: createPbkdf2PasswordHasher,
	argon2: createArgon2PasswordHasher,
} as const

type PasswordProviderName = keyof typeof PASSWORD_PROVIDERS

const DEFAULT_PASSWORD_PROVIDER: PasswordProviderName = 'pbkdf2'

const parsePasswordProviderName = (): PasswordProviderName => {
	const rawValue = process.env.PASSWORD_PROVIDER?.trim().toLowerCase()

	if (!rawValue) {
		return DEFAULT_PASSWORD_PROVIDER
	}

	if (rawValue in PASSWORD_PROVIDERS) {
		return rawValue as PasswordProviderName
	}

	throw new Error(`Unsupported PASSWORD_PROVIDER: ${rawValue}. Supported values are: pbkdf2, argon2.`)
}

const isLegacyPbkdf2Hash = (storedHash: string) => {
	return storedHash.startsWith('pbkdf2$') || storedHash.includes(':')
}

const getPasswordHasher = () => {
	if (!activePasswordHasher) {
		activePasswordProviderName = parsePasswordProviderName()
		activePasswordHasher = PASSWORD_PROVIDERS[activePasswordProviderName]()
	}

	return activePasswordHasher
}

export const hashPassword = (password: string) => {
	return getPasswordHasher().hash(password)
}

export const verifyPassword = (password: string, storedHash: string) => {
	const passwordHasher = getPasswordHasher()

	if (activePasswordProviderName === 'argon2' && isLegacyPbkdf2Hash(storedHash)) {
		return createPbkdf2PasswordHasher().verify(password, storedHash)
	}

	return passwordHasher.verify(password, storedHash)
}
