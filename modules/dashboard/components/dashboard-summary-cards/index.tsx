import type { ReactNode } from 'react'

type SummaryCard = {
  label: string
  value: string
  icon: ReactNode
  tone: 'blue' | 'rose' | 'emerald' | 'amber'
}

type DashboardSummaryCardsProps = {
  items: SummaryCard[]
}

const toneClasses: Record<SummaryCard['tone'], string> = {
  blue: 'border-[#7FA5FF] bg-[#F8FBFF] text-[#2F6FED]',
  rose: 'border-[#FFB3B1] bg-[#FFF9F9] text-[#E45D5A]',
  emerald: 'border-[#9DE8D2] bg-[#F7FFFB] text-[#1CB979]',
  amber: 'border-[#FFD08A] bg-[#FFFBF4] text-[#E99812]',
}

const DashboardSummaryCards = ({ items }: DashboardSummaryCardsProps) => {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <article
          key={item.label}
          className={[
            'rounded-2xl border px-4 py-4 shadow-[0_10px_28px_rgba(15,23,42,0.04)]',
            toneClasses[item.tone],
          ].join(' ')}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/80 shadow-sm">
              {item.icon}
            </div>
            <div>
              <p className="text-2xl font-bold leading-none text-slate-950">{item.value}</p>
              <p className="text-sm text-slate-600">{item.label}</p>
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}

export default DashboardSummaryCards