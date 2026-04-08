import { pbkdf2 as pbkdf2Callback, randomBytes } from 'node:crypto'
import { promisify } from 'node:util'

const pbkdf2 = promisify(pbkdf2Callback)

export const hashPassword = async (password: string) => {
	const salt = randomBytes(16).toString('hex')
	const derivedKey = (await pbkdf2(password, salt, 310000, 32, 'sha512')) as Buffer

	return `${salt}:${derivedKey.toString('hex')}`
}