import { APP_ROUTES } from '@/lib/routes'
import Link from 'next/link'

const AuthCodeErrorPage = () => {
	return (
		<main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(47,111,237,0.12),_transparent_32%),linear-gradient(180deg,_#f8fafc_0%,_#edf2f7_100%)] px-6 py-12 text-slate-900">
			<section className="mx-auto flex w-full max-w-2xl flex-col gap-4 rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.3)]">
				<p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Authentication Error</p>
				<h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">Unable to complete social sign in</h1>
				<p className="text-sm text-slate-600 sm:text-base">
					We could not complete your authentication callback. Please try again or use email/password sign in.
				</p>
				<div className="pt-1">
					<Link
						href={APP_ROUTES.login}
						className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
					>
						Back to Sign In
					</Link>
				</div>
			</section>
		</main>
	)
}

export default AuthCodeErrorPage
