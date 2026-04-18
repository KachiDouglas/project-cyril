import { NextResponse } from 'next/server'
import { startSocialAuth } from '@/lib/security/social-auth/service'
import type { SocialAuthIntent } from '@/lib/security/social-auth/types'

type StartGoogleSocialAuthPayload = {
	intent?: SocialAuthIntent
}

const isSocialAuthIntent = (value: string): value is SocialAuthIntent => {
	return value === 'signin' || value === 'signup'
}

const readPayload = async (request: Request): Promise<StartGoogleSocialAuthPayload> => {
	const contentType = request.headers.get('content-type') ?? ''

	if (contentType.includes('application/json')) {
		try {
			return (await request.json()) as StartGoogleSocialAuthPayload
		} catch {
			return {}
		}
	}

	const formData = await request.formData()

	return {
		intent: formData.get('intent')?.toString() as SocialAuthIntent | undefined,
	}
}

export async function POST(request: Request) {
	const payload = await readPayload(request)

	if (!payload.intent || !isSocialAuthIntent(payload.intent)) {
		return NextResponse.json({ error: 'A valid social auth intent is required.' }, { status: 400 })
	}

	const startResult = await startSocialAuth({
		providerId: 'google',
		intent: payload.intent,
		requestOrigin: new URL(request.url).origin,
	})

	if (!startResult.success) {
		return NextResponse.json({ error: startResult.error }, { status: startResult.status })
	}

	return NextResponse.json(
		{
			authorizationUrl: startResult.authorizationUrl,
			provider: 'google',
			intent: payload.intent,
		},
		{ status: 200 }
	)
}
