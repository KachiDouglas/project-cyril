import Button from '@/modules/common/components/buttons'

import { PlusIcon, UserCircleIcon } from '../dashboard-icons'

type DashboardTopbarProps = {
  eyebrow: string
  userName: string
  userRole: string
  securityLabel: string
  title: string
  description: string
}

const DashboardTopbar = ({
  eyebrow,
  userName,
  userRole,
  securityLabel,
  title,
  description,
}: DashboardTopbarProps) => {
  return (
    <header className="border-b border-white/60 bg-white/92 px-5 py-4 backdrop-blur-sm sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <p className="font-semibold text-slate-500">{eyebrow}</p>

          <div className="flex items-center gap-4 text-slate-500">
            <div className="flex items-center gap-2 font-medium text-slate-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2F6FED] text-white">
                <UserCircleIcon className="h-5 w-5" />
              </span>
              <span>{userName}</span>
            </div>
            <span className="hidden text-xs font-semibold tracking-[0.15em] text-slate-400 uppercase md:inline-flex">
              {securityLabel}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">{title}</h1>
            <p className="max-w-2xl text-sm text-slate-500">{description}</p>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
              {userRole}
            </p>
          </div>

          <Button
            type="button"
            variant="primary"
            fullWidth={false}
            className="shadow-[0_18px_40px_rgba(47,111,237,0.28)]"
            leftIcon={<PlusIcon className="h-4 w-4" />}
          >
            Create New Assessment
          </Button>
        </div>
      </div>
    </header>
  )
}

export default DashboardTopbar