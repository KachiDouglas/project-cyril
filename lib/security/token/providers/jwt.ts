import jwt from 'jsonwebtoken'
import type { TokenProvider, TokenSignOptions } from '../types'

type JwtTokenProviderConfig = {
	secret: string
	algorithm?: jwt.Algorithm
}

export const createJwtTokenProvider = (config: JwtTokenProviderConfig): TokenProvider => {
	const algorithm = config.algorithm ?? 'HS256'

	return {
		sign: (payload: Record<string, unknown>, options?: TokenSignOptions) => {
			return jwt.sign(payload, config.secret, {
				algorithm,
				expiresIn: options?.expiresInSeconds,
			})
		},
		verify: (token: string) => {
			try {
				const decoded = jwt.verify(token, config.secret)

				if (!decoded || typeof decoded === 'string') {
					return null
				}

				return decoded as Record<string, unknown>
			} catch {
				return null
			}
		},
	}
}
