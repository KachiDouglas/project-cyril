import AuthCard from '@/modules/auth/components/common/auth-card'
import AuthFooter from '@/modules/auth/components/common/auth-footer'
import AuthHeader from '@/modules/auth/components/common/auth-header'
import AuthShell from '@/modules/auth/components/common/auth-shell'
import LoginForm from '@/modules/auth/components/login/login-form'
import Link from 'next/link'
import { Suspense } from 'react'
import { APP_ROUTES } from '@/lib/routes'

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
          <Link href={APP_ROUTES.register} className="font-medium text-[#2F6FED] hover:underline">
            Create an account
          </Link>
        </p>
      </AuthCard>

      <AuthFooter />
    </AuthShell>
  )
}

export default LoginTemplate