import type { SessionUser } from '@/lib/security/session'
import { APP_ROUTES } from '@/lib/routes'
import Link from 'next/link'

type HomeTemplateProps = {
	sessionUser: SessionUser | null
}

const HomeTemplate = ({ sessionUser }: HomeTemplateProps) => {
	const userName = sessionUser ? `${sessionUser.firstName} ${sessionUser.lastName}`.trim() : ''
	const isAuthenticated = Boolean(sessionUser)

	return (
		<main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(47,111,237,0.12),_transparent_32%),linear-gradient(180deg,_#f8fafc_0%,_#edf2f7_100%)] px-6 py-12 text-slate-900">
			<section className="mx-auto flex w-full max-w-5xl flex-col gap-6 rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.3)]">
				<p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Public Home</p>
				<h1 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
					{isAuthenticated ? `Welcome back, ${userName}` : 'Safeguarding Risk Platform'}
				</h1>
				<p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
					{isAuthenticated
						? 'Your session is active. Continue to your dashboard to manage current cases.'
						: 'Home is publicly accessible. Sign in to access protected practitioner features like the dashboard.'}
				</p>

				<div className="flex flex-wrap items-center gap-3 pt-2">
					{isAuthenticated ? (
						<Link
							href={APP_ROUTES.dashboard}
							className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
						>
							Go to Dashboard
						</Link>
					) : (
						<>
							<Link
								href={APP_ROUTES.login}
								className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
							>
								Sign In
							</Link>
							<Link
								href={APP_ROUTES.register}
								className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
							>
								Create Account
							</Link>
						</>
					)}
				</div>
			</section>
		</main>
	)
}

export default HomeTemplate
