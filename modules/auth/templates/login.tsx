import AuthCard from '@/modules/auth/components/common/AuthCard'
import AuthFooter from '@/modules/auth/components/common/AuthFooter'
import AuthHeader from '@/modules/auth/components/common/AuthHeader'
import AuthShell from '@/modules/auth/components/common/AuthShell'
import Link from 'next/link'
import React from 'react'
import LoginForm from '@/modules/auth/components/login/login-form'
import { Suspense } from 'react'

const LoginTemplate = () => {
  return (
    <AuthShell>
      <AuthHeader />

      <AuthCard description="Sign in to access the assessment platform. This system is for authorised safeguarding professionals only.">
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>

          <p className="text-center text-sm text-slate-600">
            New user?{' '}
            <Link href="/register" className="font-medium text-[#2F6FED] hover:underline">
              Create an account
            </Link>
          </p>
      </AuthCard>

      <AuthFooter />
    </AuthShell>
  )
}

export default LoginTemplate