"use client"

import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'
import { useState } from 'react'

import { BrandHexagonIcon, LogoutIcon } from '../dashboard-icons'
import { API_ROUTES, APP_ROUTES } from '@/lib/routes'

type SidebarItem = {
  label: string
  icon: ReactNode
  active?: boolean
  muted?: boolean
}

type SidebarSection = {
  title: string
  items: SidebarItem[]
}

type DashboardSidebarProps = {
  brandName: string
  brandSubtitle: string
  sections: SidebarSection[]
  userName: string
  userRole: string
}

const DashboardSidebar = ({
  brandName,
  brandSubtitle,
  sections,
  userName,
  userRole,
}: DashboardSidebarProps) => {
  const router = useRouter()
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true)

      const response = await fetch(API_ROUTES.session, {
        method: 'DELETE',
      })

      if (!response.ok) {
        return
      }

      router.replace(APP_ROUTES.login)
      router.refresh()
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <aside className="w-full border-b border-slate-700 bg-[#11274A] text-slate-100 lg:min-h-screen lg:w-[280px] lg:border-b-0 lg:border-r lg:border-slate-700/80">
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#2F6FED] shadow-[0_12px_24px_rgba(47,111,237,0.35)]">
            <BrandHexagonIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-[15px] font-semibold leading-tight text-white">{brandName}</p>
            <p className="text-xs tracking-[0.16em] text-[#8CB3FF] uppercase">{brandSubtitle}</p>
          </div>
        </div>

        <nav className="flex-1 space-y-6 px-3 py-5">
          {sections.map((section) => (
            <section key={section.title} className="space-y-2">
              <p className="px-3 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                {section.title}
              </p>

              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <button
                      type="button"
                      className={[
                        'flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm transition-colors',
                        item.active
                          ? 'bg-[#2F6FED] text-white shadow-[0_10px_20px_rgba(47,111,237,0.25)]'
                          : 'text-slate-300 hover:bg-white/6 hover:text-white',
                        item.muted ? 'opacity-70' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                    >
                      <span className={item.active ? 'text-white' : 'text-slate-400'}>{item.icon}</span>
                      <span className="flex-1">{item.label}</span>
                      {item.active ? <span className="text-xs font-semibold">Active</span> : null}
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </nav>

        <div className="border-t border-white/10 px-4 py-4">
          <div className="flex items-center gap-3 rounded-2xl bg-white/6 px-3 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2F6FED]/20 text-white">
              <span className="text-sm font-semibold">{userName.slice(0, 1)}</span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">{userName}</p>
              <p className="truncate text-xs text-slate-400">{userRole}</p>
            </div>
            <button
              type="button"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Sign out"
              aria-busy={isSigningOut}
            >
              <LogoutIcon className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default DashboardSidebar