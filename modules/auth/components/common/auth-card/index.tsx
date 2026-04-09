import React from 'react'

type AuthCardProps = {
  description: string
  children: React.ReactNode
}

const AuthCard = ({ description, children }: AuthCardProps) => {
  return (
    <div className="w-full max-w-[530px] rounded-2xl border border-white/25 bg-[#F2F4F7] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.25)] md:p-7">
      <p className="mb-5 text-[13px] leading-5 text-slate-700">{description}</p>
      {children}
      <p className="mt-3 text-center text-xs text-slate-500">
        Secure access for authorised child protection professionals only
      </p>
    </div>
  )
}

export default AuthCard