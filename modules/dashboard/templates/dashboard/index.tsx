import DashboardAlertsPanel from '@/modules/dashboard/components/dashboard-alerts-panel'
import DashboardCasesPanel from '@/modules/dashboard/components/dashboard-cases-panel'
import DashboardFooter from '@/modules/dashboard/components/dashboard-footer'
import type { SessionUser } from '@/lib/session'
import {
  AssessmentIcon,
  AnalyticsIcon,
  CasesIcon,
  CompletedIcon,
  DashboardIcon,
  DesistanceIcon,
  ProgressIcon,
  RiskDomainIcon,
  ScreeningIcon,
  SummaryUsersIcon,
  WarningIcon,
} from '@/modules/dashboard/components/dashboard-icons'
import DashboardSidebar from '@/modules/dashboard/components/dashboard-sidebar'
import DashboardSummaryCards from '@/modules/dashboard/components/dashboard-summary-cards'
import DashboardTopbar from '@/modules/dashboard/components/dashboard-topbar'

const navigationSections = [
  {
    title: 'Assessment',
    items: [
      { label: 'Dashboard', icon: <DashboardIcon className="h-4.5 w-4.5" />, active: false },
      { label: 'View all complete cases', icon: <CasesIcon className="h-4.5 w-4.5" />, muted: true },
      { label: 'New Cases', icon: <AssessmentIcon className="h-4.5 w-4.5" />, active: true },
      { label: 'Screening', icon: <ScreeningIcon className="h-4.5 w-4.5" />, muted: true },
      { label: 'Risk Domains', icon: <RiskDomainIcon className="h-4.5 w-4.5" />, muted: true },
      { label: 'Desistance Domains', icon: <DesistanceIcon className="h-4.5 w-4.5" />, muted: true },
      { label: 'Risk Visualisation', icon: <AnalyticsIcon className="h-4.5 w-4.5" />, muted: true },
      { label: 'Assessment Summary', icon: <AssessmentIcon className="h-4.5 w-4.5" />, muted: true },
    ],
  },
  {
    title: 'Recommendation',
    items: [{ label: 'Recommendation', icon: <AssessmentIcon className="h-4.5 w-4.5" />, muted: true }],
  },
]

const summaryItems = [
  {
    label: 'Active Cases',
    value: '3',
    icon: <SummaryUsersIcon className="h-5 w-5" />,
    tone: 'blue' as const,
  },
  {
    label: 'High Risk',
    value: '1',
    icon: <WarningIcon className="h-5 w-5" />,
    tone: 'rose' as const,
  },
  {
    label: 'Completed',
    value: '2',
    icon: <CompletedIcon className="h-5 w-5" />,
    tone: 'emerald' as const,
  },
  {
    label: 'In Progress',
    value: '1',
    icon: <ProgressIcon className="h-5 w-5" />,
    tone: 'amber' as const,
  },
]

const activeCases = [
  {
    caseId: 'CP-2026-0041',
    riskLabel: 'High Risk',
    riskTone: 'high' as const,
    statusLabel: 'Completed',
    statusTone: 'completed' as const,
    accessorName: 'Dr. Nicholas Blagden',
    organisation: "Children's Social Services, Manchester",
    createdAt: '2026-03-02',
  },
  {
    caseId: 'CP-2026-0036',
    riskLabel: 'Medium Risk',
    riskTone: 'medium' as const,
    statusLabel: 'In progress',
    statusTone: 'progress' as const,
    accessorName: 'Dr. Queenie Obasi-Richards',
    organisation: 'Youth Offending Service, Leeds',
    createdAt: '2026-02-26',
  },
  {
    caseId: 'CP-2026-0036',
    riskLabel: 'Low Risk',
    riskTone: 'low' as const,
    statusLabel: 'Completed',
    statusTone: 'completed' as const,
    accessorName: 'Dr. Jérôme Endrass',
    organisation: "Children's Social Services, Manchester",
    createdAt: '2026-02-25',
  },
]

const alertItems = [
  {
    tone: 'critical' as const,
    message: 'Case CP-2026-0041: Attempted contact confirmed - urgent review required',
    time: '2 hours ago',
  },
  {
    tone: 'warning' as const,
    message: 'Case CP-2026-0038: Assessment overdue - 5 days past review date',
    time: '1 day ago',
  },
  {
    tone: 'info' as const,
    message: 'Case CP-2026-0029: Scheduled 90-day review approaching in 7 days',
    time: '3 days ago',
  },
]

type DashboardTemplateProps = {
  sessionUser: SessionUser
}

const DashboardTemplate = ({ sessionUser }: DashboardTemplateProps) => {
  const sessionUserName = `${sessionUser.firstName} ${sessionUser.lastName}`.trim()
  const sessionUserRole = sessionUser.role

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(47,111,237,0.12),_transparent_32%),linear-gradient(180deg,_#f8fafc_0%,_#edf2f7_100%)] text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col lg:flex-row">
        <DashboardSidebar
          brandName="Hexagon Risk"
          brandSubtitle="Assessment Tool"
          sections={navigationSections}
          userName={sessionUserName}
          userRole={sessionUserRole}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardTopbar
            eyebrow="Child Protection Safeguarding System"
            userName={sessionUserName}
            userRole={sessionUserRole}
            securityLabel="OFFICIAL - SENSITIVE"
            title="Assessment Dashboard"
            description="Overview of active cases and recent assessment activity"
          />

          <main className="flex flex-1 flex-col gap-5 px-5 py-5 sm:px-6 lg:px-8">
            <DashboardSummaryCards items={summaryItems} />

            <section className="grid gap-5 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.9fr)]">
              <DashboardCasesPanel title="Active Cases" items={activeCases} />
              <DashboardAlertsPanel title="Risk Alerts" items={alertItems} />
            </section>

            <DashboardFooter
              versionLabel="Framework Version"
              updateLabel="Last System Update"
            />
          </main>
        </div>
      </div>
    </div>
  )
}

export default DashboardTemplate