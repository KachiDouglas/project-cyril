'use client'

import Button from '@/modules/common/components/buttons'
import { useToast } from '@/modules/common/components/toast'
import SocialAuthButtons from '@/modules/auth/components/common/social-auth-buttons'
import FieldGroup from '@/modules/auth/components/common/field-group'
import { EyeIcon, LockIcon, MailIcon } from '@/modules/auth/components/common/icons'
import type { SocialAuthProvider } from '@/modules/auth/config/social-auth-providers'
import { beginSocialAuth } from '@/modules/auth/lib/social-auth-client'
import Input from '@/modules/common/components/input'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { API_ROUTES, APP_ROUTES, buildAppRoute } from '@/lib/routes'

type RegisterFormState = {
  firstName: string
  lastName: string
  role: string
  email: string
  password: string
  dateOfBirth: string
}

type RegisterFormErrors = Partial<Record<keyof RegisterFormState, string>> & {
  form?: string
}

const initialState: RegisterFormState = {
  firstName: '',
  lastName: '',
  role: '',
  email: '',
  password: '',
  dateOfBirth: '',
}

const validate = (values: RegisterFormState): RegisterFormErrors => {
  const errors: RegisterFormErrors = {}

  if (values.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters long.'
  }

  if (values.lastName.trim().length < 2) {
    errors.lastName = 'Last name must be at least 2 characters long.'
  }

  if (values.role.trim().length < 2) {
    errors.role = 'Role must be at least 2 characters long.'
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }

  if (values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters long.'
  }

  if (!values.dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required.'
  }

  return errors
}

const RegisterForm = () => {
  const router = useRouter()
  const { showToast } = useToast()
  const [values, setValues] = useState<RegisterFormState>(initialState)
  const [errors, setErrors] = useState<RegisterFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined, form: undefined }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const validationErrors = validate(values)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      showToast({
        title: 'Registration failed',
        description: 'Please check the highlighted fields and try again.',
        variant: 'error',
      })
      return
    }

    try {
      setIsSubmitting(true)
      setErrors({})

      const response = await fetch(API_ROUTES.register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const payload = (await response.json()) as { error?: string; message?: string }

      if (!response.ok) {
        setErrors({ form: payload.error ?? 'Unable to create account.' })
        showToast({
          title: 'Registration failed',
          description: payload.error ?? 'Unable to create account.',
          variant: 'error',
        })
        return
      }

      showToast({
        title: 'Account created',
        description: payload.message ?? 'Your registration was successful.',
        variant: 'success',
      })
      setValues(initialState)
      window.setTimeout(() => {
        router.push(buildAppRoute(APP_ROUTES.login, { registered: 1 }))
      }, 1200)
    } catch {
      setErrors({ form: 'Unable to create account.' })
      showToast({
        title: 'Registration failed',
        description: 'Unable to create account.',
        variant: 'error',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSocialAuth = async (provider: SocialAuthProvider) => {
    setIsSubmitting(true)

    const socialAuthResult = await beginSocialAuth(provider.id, 'signup')

    if (!socialAuthResult.success) {
      showToast({
        title: `${provider.label} registration unavailable`,
        description: socialAuthResult.error,
        variant: 'info',
        duration: 2000,
      })
      setIsSubmitting(false)
      return
    }

    window.location.assign(socialAuthResult.authorizationUrl)
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <SocialAuthButtons intentLabel="Create account" onProviderClick={handleSocialAuth} disabled={isSubmitting} />

      <div className="relative py-1">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase tracking-[0.12em] text-slate-400">
          <span className="bg-white px-2">Or continue with details</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FieldGroup htmlFor="firstName" label="First Name">
          <Input
            id="firstName"
            name="firstName"
            value={values.firstName}
            onChange={handleChange}
            variant="secondary"
            fullWidth
            placeholder="Enter your first name"
            autoComplete="given-name"
            disabled={isSubmitting}
          />
          {errors.firstName ? <p className="mt-1 text-xs text-red-600">{errors.firstName}</p> : null}
        </FieldGroup>

        <FieldGroup htmlFor="lastName" label="Last Name">
          <Input
            id="lastName"
            name="lastName"
            value={values.lastName}
            onChange={handleChange}
            variant="secondary"
            fullWidth
            placeholder="Enter your last name"
            autoComplete="family-name"
            disabled={isSubmitting}
          />
          {errors.lastName ? <p className="mt-1 text-xs text-red-600">{errors.lastName}</p> : null}
        </FieldGroup>
      </div>

      <FieldGroup htmlFor="role" label="Role">
        <Input
          id="role"
          name="role"
          value={values.role}
          onChange={handleChange}
          variant="secondary"
          fullWidth
          maxWidth={530}
          placeholder="e.g. Senior Practitioner"
          autoComplete="organization-title"
          disabled={isSubmitting}
        />
        {errors.role ? <p className="mt-1 text-xs text-red-600">{errors.role}</p> : null}
      </FieldGroup>

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
          autoComplete="new-password"
          disabled={isSubmitting}
        />
        {errors.password ? <p className="mt-1 text-xs text-red-600">{errors.password}</p> : null}
      </FieldGroup>

      <FieldGroup htmlFor="dateOfBirth" label="Date of Birth">
        <Input
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          value={values.dateOfBirth}
          onChange={handleChange}
          variant="secondary"
          fullWidth
          maxWidth={530}
          disabled={isSubmitting}
        />
        {errors.dateOfBirth ? <p className="mt-1 text-xs text-red-600">{errors.dateOfBirth}</p> : null}
      </FieldGroup>

      {errors.form ? <p className="text-sm text-red-600">{errors.form}</p> : null}

      <Button type="submit" variant="primary" fullWidth maxWidth={530} loading={isSubmitting}>
        Create Account
      </Button>
    </form>
  )
}

export default RegisterForm