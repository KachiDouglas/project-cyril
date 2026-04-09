import Button from '@/modules/common/components/buttons'
import Input from '@/modules/common/components/input'

import { EyeIcon, FilterIcon, SearchIcon } from '../dashboard-icons'

type RiskTone = 'high' | 'medium' | 'low'
type StatusTone = 'completed' | 'progress'

type CaseItem = {
  caseId: string
  riskLabel: string
  riskTone: RiskTone
  statusLabel: string
  statusTone: StatusTone
  accessorName: string
  organisation: string
  createdAt: string
}

type DashboardCasesPanelProps = {
  title: string
  items: CaseItem[]
}

const riskToneClasses: Record<RiskTone, string> = {
  high: 'bg-[#FFE7E6] text-[#D94E4B]',
  medium: 'bg-[#FFF2D8] text-[#CA7A08]',
  low: 'bg-[#E0F7F1] text-[#1B9B74]',
}

const statusToneClasses: Record<StatusTone, string> = {
  completed: 'bg-[#DFF5EA] text-[#1A9A6A]',
  progress: 'bg-[#DFDEF9] text-[#5D56D8]',
}

const DashboardCasesPanel = ({ title, items }: DashboardCasesPanelProps) => {
  return (
    <section className="rounded-[28px] border border-slate-200/80 bg-white p-4 shadow-[0_20px_50px_rgba(15,23,42,0.05)]">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="text-lg font-bold text-slate-950">{title}</h2>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Input
            type="search"
            size="sm"
            variant="secondary"
            fullWidth
            maxWidth={300}
            placeholder="Search cases...."
            leftIcon={<SearchIcon className="h-4 w-4" />}
          />

          <Button
            type="button"
            variant="secondary"
            size="sm"
            fullWidth={false}
            leftIcon={<FilterIcon className="h-4 w-4" />}
          >
            Filter
          </Button>
        </div>
      </div>

      <ul className="divide-y divide-slate-200/80 overflow-hidden rounded-[24px] border border-slate-200/60 bg-slate-50/40">
        {items.map((item) => (
          <li key={item.caseId} className="px-4 py-5 transition-colors hover:bg-white">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-medium text-slate-950">{item.caseId}</p>
                  <span className={['rounded-full px-3 py-1 text-xs font-semibold', riskToneClasses[item.riskTone]].join(' ')}>
                    {item.riskLabel}
                  </span>
                  <span className={['rounded-full px-3 py-1 text-xs font-semibold', statusToneClasses[item.statusTone]].join(' ')}>
                    {item.statusLabel}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                  <span>
                    Accessor Name: <span className="font-medium text-slate-700">{item.accessorName}</span>
                  </span>
                  <span>{item.organisation}</span>
                </div>

                <p className="text-xs text-slate-500">Date created {item.createdAt}</p>
              </div>

              <Button
                type="button"
                variant="secondary"
                size="sm"
                fullWidth={false}
                leftIcon={<EyeIcon className="h-4 w-4" />}
                className="border-[#7FA5FF] text-[#2F6FED] hover:bg-[#F5F8FF]"
              >
                View
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default DashboardCasesPanel