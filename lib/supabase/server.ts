import { createClient } from '@supabase/supabase-js'

const getSupabaseUrl = () => {
	const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.PROJECT_URL

	if (!url) {
		throw new Error('Supabase URL is not configured. Set NEXT_PUBLIC_SUPABASE_URL or PROJECT_URL.')
	}

	return url
}

const getSupabasePublishableKey = () => {
	const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.PUBLISHABLE_KEY

	if (!key) {
		throw new Error('Supabase publishable key is not configured. Set NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY or PUBLISHABLE_KEY.')
	}

	return key
}

export const createSupabaseServerClient = () => {
	return createClient(getSupabaseUrl(), getSupabasePublishableKey())
}
