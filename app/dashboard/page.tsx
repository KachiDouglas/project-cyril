import { APP_ROUTES } from '@/lib/routes'
import { requireAuthenticatedUser } from '@/lib/security/session/guards'
import DashboardTemplate from '@/modules/dashboard/templates/dashboard'
import React from 'react'

const DashboardPage = async () => {
	const sessionUser = await requireAuthenticatedUser({
		nextPathname: APP_ROUTES.dashboard,
	})

  return (
    <DashboardTemplate sessionUser={sessionUser} />
  )
}

export default DashboardPage