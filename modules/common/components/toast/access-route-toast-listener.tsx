'use client'

import {
	ACCESS_TOAST_DURATION_MS,
	ACCESS_TOAST_PAYLOADS,
	ACCESS_TOAST_QUERY_KEY,
	parseAccessToastCode,
} from '@/lib/security/access-feedback'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { useToast } from './index'

const AccessRouteToastListener = () => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const { showToast } = useToast()
	const handledRef = useRef<string>('')

	useEffect(() => {
		const parsedCode = parseAccessToastCode(searchParams.get(ACCESS_TOAST_QUERY_KEY))

		if (!parsedCode || !pathname) {
			return
		}

		const stateKey = `${pathname}::${parsedCode}`

		if (handledRef.current === stateKey) {
			return
		}

		handledRef.current = stateKey

		const payload = ACCESS_TOAST_PAYLOADS[parsedCode]

		showToast({
			title: payload.title,
			description: payload.description,
			variant: payload.variant,
			duration: ACCESS_TOAST_DURATION_MS,
		})

		const nextParams = new URLSearchParams(searchParams.toString())
		nextParams.delete(ACCESS_TOAST_QUERY_KEY)

		const queryString = nextParams.toString()
		const targetUrl = queryString ? `${pathname}?${queryString}` : pathname

		router.replace(targetUrl, { scroll: false })
	}, [pathname, router, searchParams, showToast])

	return null
}

export default AccessRouteToastListener
