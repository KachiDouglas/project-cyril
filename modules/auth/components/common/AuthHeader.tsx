import React from 'react'
import { ShieldIcon } from './icons'

const AuthHeader = () => {
  return (
    <div className="mb-10 flex flex-col items-center">
      <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-[#2F6FED] shadow-[0_6px_20px_rgba(47,111,237,0.35)]">
        <ShieldIcon className="h-7 w-7" />
      </div>

      <h1 className="text-center text-4xl font-extrabold tracking-tight md:text-5xl">
        Hexagon Risk Assessment Tool
      </h1>
      <p className="mt-1 text-sm text-blue-100/90">Child Protective Service</p>
      <div className="mt-4 rounded-full border border-[#5E93FF] bg-[#2F6FED]/35 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#DAE6FF]">
        OFFICIAL - SENSITIVE | Authorised Users Only
      </div>
    </div>
  )
}

export default AuthHeader