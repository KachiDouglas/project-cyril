import { createJwtTokenProvider } from './providers/jwt'
import type { TokenProvider, TokenSignOptions } from './types'

let activeTokenProvider: TokenProvider | null = null

const TOKEN_PROVIDERS = {
	jwt: createJwtTokenProvider,
} as const

type TokenProviderName = keyof typeof TOKEN_PROVIDERS

const DEFAULT_TOKEN_PROVIDER: TokenProviderName = 'jwt'

const parseTokenProviderName = (): TokenProviderName => {
	const rawValue = process.env.TOKEN_PROVIDER?.trim().toLowerCase()

	if (!rawValue) {
		return DEFAULT_TOKEN_PROVIDER
	}

	if (rawValue in TOKEN_PROVIDERS) {
		return rawValue as TokenProviderName
	}

	throw new Error(`Unsupported TOKEN_PROVIDER: ${rawValue}. Supported values are: jwt.`)
}

const getJwtSecret = () => {
	const secret = process.env.JWT_SECRET

	if (!secret) {
		throw new Error('JWT_SECRET is not set.')
	}

	return secret
}

const getTokenProvider = () => {
	if (!activeTokenProvider) {
		const tokenProviderName = parseTokenProviderName()
		activeTokenProvider = TOKEN_PROVIDERS[tokenProviderName]({ secret: getJwtSecret() })
	}

	return activeTokenProvider
}

export const signToken = (payload: Record<string, unknown>, options?: TokenSignOptions) => {
	return getTokenProvider().sign(payload, options)
}

export const verifyToken = <TPayload extends Record<string, unknown>>(token: string): TPayload | null => {
	const decoded = getTokenProvider().verify(token)

	if (!decoded) {
		return null
	}

	return decoded as TPayload
}
