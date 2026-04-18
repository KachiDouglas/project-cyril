export type TokenSignOptions = {
	expiresInSeconds?: number
}

export type TokenProvider = {
	sign: (payload: Record<string, unknown>, options?: TokenSignOptions) => string
	verify: (token: string) => Record<string, unknown> | null
}
