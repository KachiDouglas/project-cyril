import React from 'react'

type FieldGroupProps = {
  htmlFor: string
  label: string
  children: React.ReactNode
}

const FieldGroup = ({ htmlFor, label, children }: FieldGroupProps) => {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="text-xs font-semibold text-slate-700">
        {label}
      </label>
      {children}
    </div>
  )
}

export default FieldGroup