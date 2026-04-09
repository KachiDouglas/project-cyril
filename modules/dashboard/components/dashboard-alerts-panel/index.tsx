type AlertTone = 'critical' | 'warning' | 'info'

type AlertItem = {
  tone: AlertTone
  message: string
  time: string
}

type DashboardAlertsPanelProps = {
  title: string
  items: AlertItem[]
}

const toneClasses: Record<AlertTone, string> = {
  critical: 'bg-[#EF5B59]',
  warning: 'bg-[#F39A1F]',
  info: 'bg-[#4377E8]',
}

const DashboardAlertsPanel = ({ title, items }: DashboardAlertsPanelProps) => {
  return (
    <section className="rounded-[28px] border border-slate-200/80 bg-white p-4 shadow-[0_20px_50px_rgba(15,23,42,0.05)]">
      <h2 className="mb-4 text-lg font-bold text-slate-950">{title}</h2>

      <ul className="divide-y divide-slate-200/80 overflow-hidden rounded-[24px] border border-slate-200/60 bg-slate-50/40">
        {items.map((item) => (
          <li key={`${item.message}-${item.time}`} className="flex gap-3 px-4 py-5">
            <span className={['mt-2 h-2.5 w-2.5 rounded-full', toneClasses[item.tone]].join(' ')} />
            <div className="space-y-1 text-sm">
              <p className="text-slate-700">{item.message}</p>
              <p className="text-xs text-slate-500">{item.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default DashboardAlertsPanel