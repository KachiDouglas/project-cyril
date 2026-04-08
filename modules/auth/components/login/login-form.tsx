'use client'

import { useToast } from '@/modules/common/components/toast'
import Button from '@/modules/common/components/buttons'
import FieldGroup from '@/modules/auth/components/common/FieldGroup'
import { EyeIcon, LockIcon, MailIcon } from '@/modules/auth/components/common/icons'
import Input from '@/modules/common/components/input'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type LoginFormState = {
	email: string
	password: string
	keepSignedIn: boolean
}

type LoginFormErrors = Partial<Record<keyof Omit<LoginFormState, 'keepSignedIn'>, string>> & {
	form?: string
}

const initialState: LoginFormState = {
	email: '',
	password: '',
	keepSignedIn: false,
}

const validate = (values: LoginFormState): LoginFormErrors => {
	const errors: LoginFormErrors = {}

	if (!values.email.trim()) {
		errors.email = 'Email is required.'
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
		errors.email = 'Enter a valid email address.'
	}

	if (!values.password) {
		errors.password = 'Password is required.'
	}

	return errors
}

const LoginForm = () => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const { showToast } = useToast()
	const [values, setValues] = useState<LoginFormState>(initialState)
	const [errors, setErrors] = useState<LoginFormErrors>({})
	const [isSubmitting, setIsSubmitting] = useState(false)

	useEffect(() => {
		if (searchParams.get('registered') === '1') {
			showToast({
				title: 'Registration successful',
				description: 'Your account has been created. You can now sign in.',
				variant: 'success',
			})
		}
	}, [searchParams, showToast])

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, type, checked } = event.target

		setValues((current) => ({
			...current,
			[name]: type === 'checkbox' ? checked : value,
		}))
		setErrors((current) => ({ ...current, [name]: undefined, form: undefined }))
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const validationErrors = validate(values)

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors)
			showToast({
				title: 'Sign in failed',
				description: 'Please check the highlighted fields and try again.',
				variant: 'error',
			})
			return
		}

		try {
			setIsSubmitting(true)
			setErrors({})

			const response = await fetch('/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			})

			const payload = (await response.json()) as { error?: string; message?: string }

			if (!response.ok) {
				setErrors({ form: payload.error ?? 'Unable to sign in.' })
				showToast({
					title: 'Sign in failed',
					description: payload.error ?? 'Unable to sign in.',
					variant: 'error',
				})
				return
			}

			showToast({
				title: 'Signed in successfully',
				description: payload.message ?? 'Redirecting to your dashboard.',
				variant: 'success',
			})

			window.setTimeout(() => {
				router.push('/')
			}, 1000)
		} catch {
			setErrors({ form: 'Unable to sign in.' })
			showToast({
				title: 'Sign in failed',
				description: 'Unable to sign in.',
				variant: 'error',
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<form className="space-y-4" onSubmit={handleSubmit} noValidate>
			<FieldGroup htmlFor="email" label="Email Address">
				<Input
					id="email"
					name="email"
					type="email"
					value={values.email}
					onChange={handleChange}
					variant="secondary"
					fullWidth
					maxWidth={530}
					placeholder="your.name@organisation.gov.uk"
					leftIcon={<MailIcon className="h-4 w-4" />}
					autoComplete="email"
					disabled={isSubmitting}
				/>
				{errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email}</p> : null}
			</FieldGroup>

			<FieldGroup htmlFor="password" label="Password">
				<Input
					id="password"
					name="password"
					type="password"
					value={values.password}
					onChange={handleChange}
					variant="secondary"
					fullWidth
					maxWidth={530}
					placeholder="Enter your password"
					leftIcon={<LockIcon className="h-4 w-4" />}
					rightIcon={<EyeIcon className="h-4 w-4" />}
					autoComplete="current-password"
					disabled={isSubmitting}
				/>
				{errors.password ? <p className="mt-1 text-xs text-red-600">{errors.password}</p> : null}
			</FieldGroup>

			<div className="flex items-center justify-between pt-0.5 text-sm">
				<label htmlFor="keep-signed-in" className="inline-flex items-center gap-2 text-slate-600">
					<input
						type="checkbox"
						id="keep-signed-in"
						name="keepSignedIn"
						checked={values.keepSignedIn}
						onChange={handleChange}
						className="h-4 w-4 rounded border-slate-300 text-[#2F6FED] focus:ring-[#2F6FED]"
					/>
					<span>Keep me signed in</span>
				</label>

				<Link href="/forgot-password" className="font-medium text-[#2F6FED] hover:underline">
					Forgot password?
				</Link>
			</div>

			{errors.form ? <p className="text-sm text-red-600">{errors.form}</p> : null}

			<Button variant="primary" fullWidth maxWidth={530} type="submit" loading={isSubmitting}>
				Sign In Securely
			</Button>
		</form>
	)
}

export default LoginForm