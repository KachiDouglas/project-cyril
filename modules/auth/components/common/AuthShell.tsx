import React from 'react'

type AuthShellProps = {
  children: React.ReactNode
}

const AuthShell = ({ children }: AuthShellProps) => {
  return (
    <div className="relative flex min-h-screen flex-col items-center bg-[#0F2B54] px-4 py-10 text-white">
      <div className="flex w-full max-w-[1140px] flex-1 flex-col items-center justify-center">
        {children}
      </div>
    </div>
  )
}

export default AuthShell