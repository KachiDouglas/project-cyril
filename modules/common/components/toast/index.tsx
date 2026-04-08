'use client'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

type ToastVariant = 'success' | 'error' | 'info'

type ToastInput = {
	title: string
	description?: string
	variant?: ToastVariant
	duration?: number
}

type ToastItem = Required<Pick<ToastInput, 'title'>> &
	Pick<ToastInput, 'description' | 'variant'> & {
		id: string
	}

type ToastContextValue = {
	showToast: (toast: ToastInput) => string
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

const variantStyles: Record<ToastVariant, string> = {
	success: 'border-emerald-200 bg-emerald-50 text-emerald-950',
	error: 'border-red-200 bg-red-50 text-red-950',
	info: 'border-slate-200 bg-white text-slate-900',
}

const variantDotStyles: Record<ToastVariant, string> = {
	success: 'bg-emerald-500',
	error: 'bg-red-500',
	info: 'bg-slate-500',
}

const ToastViewport = ({ items, dismiss }: { items: ToastItem[]; dismiss: (id: string) => void }) => {
	return (
		<div className="fixed right-4 top-4 z-50 flex w-full max-w-sm flex-col gap-3 px-4 sm:px-0">
			{items.map((toast) => (
				<div
					key={toast.id}
					role="status"
					aria-live="polite"
					className={`rounded-2xl border p-4 shadow-lg backdrop-blur ${variantStyles[toast.variant ?? 'info']}`}
				>
					<div className="flex items-start gap-3">
						<span className={`mt-1 h-2.5 w-2.5 rounded-full ${variantDotStyles[toast.variant ?? 'info']}`} />
						<div className="min-w-0 flex-1">
							<p className="text-sm font-semibold">{toast.title}</p>
							{toast.description ? <p className="mt-1 text-sm text-slate-600">{toast.description}</p> : null}
						</div>
						<button
							type="button"
							onClick={() => dismiss(toast.id)}
							className="rounded-md px-2 py-1 text-sm font-medium text-slate-500 hover:bg-black/5 hover:text-slate-900"
							aria-label="Dismiss toast"
						>
							×
						</button>
					</div>
				</div>
			))}
		</div>
	)
}

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
	const [items, setItems] = useState<ToastItem[]>([])
	const timersRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({})

	const dismiss = useCallback((id: string) => {
		const timer = timersRef.current[id]
		if (timer) {
			clearTimeout(timer)
			delete timersRef.current[id]
		}

		setItems((current) => current.filter((item) => item.id !== id))
	}, [])

	const showToast = useCallback(
		(toast: ToastInput) => {
			const id = crypto.randomUUID()
			const item: ToastItem = {
				id,
				title: toast.title,
				description: toast.description,
				variant: toast.variant ?? 'info',
			}

			setItems((current) => [item, ...current].slice(0, 3))

			timersRef.current[id] = setTimeout(() => {
				dismiss(id)
			}, toast.duration ?? 3000)

			return id
		},
		[dismiss]
	)

	useEffect(() => {
		return () => {
			Object.values(timersRef.current).forEach(clearTimeout)
			timersRef.current = {}
		}
	}, [])

	const value = useMemo(() => ({ showToast }), [showToast])

	return (
		<ToastContext.Provider value={value}>
			{children}
			<ToastViewport items={items} dismiss={dismiss} />
		</ToastContext.Provider>
	)
}

export const useToast = () => {
	const context = useContext(ToastContext)

	if (!context) {
		throw new Error('useToast must be used within a ToastProvider')
	}

	return context
}