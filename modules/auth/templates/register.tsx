import AuthCard from '@/modules/auth/components/common/AuthCard'
import AuthFooter from '@/modules/auth/components/common/AuthFooter'
import AuthHeader from '@/modules/auth/components/common/AuthHeader'
import AuthShell from '@/modules/auth/components/common/AuthShell'
import RegisterForm from '@/modules/auth/components/register/register-form'
import Link from 'next/link'
import React from 'react'

const RegisterTemplate = () => {
  return (
    <AuthShell>
      <AuthHeader />

      <AuthCard description="Create your account to access the assessment platform. This system is for authorised safeguarding professionals only.">
        <RegisterForm />

        <div className="mt-4 flex items-center justify-between pt-0.5 text-sm text-slate-600">
          <span>Already have an account?</span>
          <Link href="/login" className="font-medium text-[#2F6FED] hover:underline">
            Sign in
          </Link>
        </div>
      </AuthCard>

      <AuthFooter />
    </AuthShell>
  )
}

export default RegisterTemplate