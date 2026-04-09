import { getSessionUserFromCookies } from '@/lib/session'
import DashboardTemplate from '@/modules/dashboard/templates/dashboard'
import { APP_ROUTES } from '@/lib/routes'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const DashboardPage = async () => {
	const sessionUser = getSessionUserFromCookies(await cookies())

	if (!sessionUser) {
		redirect(APP_ROUTES.login)
	}

  return (
    <DashboardTemplate sessionUser={sessionUser} />
  )
}

export default DashboardPage