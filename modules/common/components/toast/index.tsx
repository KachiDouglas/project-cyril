'use client'

import React, { createContext, useCallback, useContext, useMemo } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type ToastVariant = 'success' | 'error' | 'info'

type ToastInput = {
	title: string
	description?: string
	variant?: ToastVariant
	duration?: number
}

type ToastContextValue = {
	showToast: (toast: ToastInput) => string
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

const ToastContent = ({ title, description }: { title: string; description?: string }) => {
	return (
		<div>
			<p className="text-sm font-semibold">{title}</p>
			{description ? <p className="mt-1 text-sm text-slate-700">{description}</p> : null}
		</div>
	)
}

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
	const showToast = useCallback(
		(input: ToastInput) => {
			const variant = input.variant ?? 'info'
			const toastId = crypto.randomUUID()
			const content = <ToastContent title={input.title} description={input.description} />

			if (variant === 'success') {
				toast.success(content, { toastId, autoClose: input.duration ?? 3000 })
			} else if (variant === 'error') {
				toast.error(content, { toastId, autoClose: input.duration ?? 3000 })
			} else {
				toast.info(content, { toastId, autoClose: input.duration ?? 3000 })
			}

			return toastId
		},
		[]
	)

	const value = useMemo(() => ({ showToast }), [showToast])

	return (
		<ToastContext.Provider value={value}>
			{children}
			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				closeOnClick
				pauseOnHover
				draggable
				newestOnTop
				limit={3}
				theme="light"
				toastClassName={() =>
					'rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 shadow-lg backdrop-blur'
				}
			/>
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