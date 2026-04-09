type DashboardFooterProps = {
  versionLabel: string
  updateLabel: string
}

const DashboardFooter = ({ versionLabel, updateLabel }: DashboardFooterProps) => {
  return (
    <footer className="mt-6 bg-[#10366f] px-5 py-3 text-white sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
        <p className="font-medium text-[#AFC7FF]">{versionLabel}</p>
        <p className="font-medium text-[#AFC7FF]">{updateLabel}</p>
      </div>
    </footer>
  )
}

export default DashboardFooter