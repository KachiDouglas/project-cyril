import { pbkdf2 as pbkdf2Callback, randomBytes, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'
import type { PasswordHasher } from '../types'

const pbkdf2 = promisify(pbkdf2Callback)
const HASH_PREFIX = 'pbkdf2'
const HASH_DIGEST = 'sha512'
const HASH_ITERATIONS = 310000
const HASH_KEY_LENGTH = 32

const derive = async (password: string, salt: string, iterations: number, keyLength: number, digest: string) => {
	return (await pbkdf2(password, salt, iterations, keyLength, digest)) as Buffer
}

const parseStoredHash = (storedHash: string) => {
	const parts = storedHash.split('$')

	if (parts.length === 5 && parts[0] === HASH_PREFIX) {
		const [, digest, iterations, salt, hash] = parts
		const parsedIterations = Number(iterations)

		if (!digest || !salt || !hash || !Number.isFinite(parsedIterations)) {
			return null
		}

		return {
			digest,
			iterations: parsedIterations,
			salt,
			hash,
		}
	}

	const legacy = storedHash.split(':')

	if (legacy.length === 2 && legacy[0] && legacy[1]) {
		return {
			digest: HASH_DIGEST,
			iterations: HASH_ITERATIONS,
			salt: legacy[0],
			hash: legacy[1],
		}
	}

	return null
}

export const createPbkdf2PasswordHasher = (): PasswordHasher => {
	return {
		hash: async (password: string) => {
			const salt = randomBytes(16).toString('hex')
			const derivedKey = await derive(password, salt, HASH_ITERATIONS, HASH_KEY_LENGTH, HASH_DIGEST)

			return `${HASH_PREFIX}$${HASH_DIGEST}$${HASH_ITERATIONS}$${salt}$${derivedKey.toString('hex')}`
		},

		verify: async (password: string, storedHash: string) => {
			const parsed = parseStoredHash(storedHash)

			if (!parsed) {
				return false
			}

			const expected = Buffer.from(parsed.hash, 'hex')
			const derivedKey = await derive(password, parsed.salt, parsed.iterations, expected.length, parsed.digest)
			const actual = Buffer.from(derivedKey.toString('hex'), 'hex')

			if (expected.length !== actual.length) {
				return false
			}

			return timingSafeEqual(expected, actual)
		},
	}
}
