import React from 'react'

type InputVariant = 'primary' | 'secondary' | 'tertiary'
type InputSize = 'sm' | 'md' | 'lg'

export type InputProps = Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	'size' | 'type'
> & {
	variant?: InputVariant
	size?: InputSize
	loading?: boolean
	disabled?: boolean
	fullWidth?: boolean
	leftIcon?: React.ReactNode
	rightIcon?: React.ReactNode
	maxWidth?: number
	type?: string
}

const variantClasses: Record<InputVariant, string> = {
	primary:
		'border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-[#2F6FED] focus:ring-2 focus:ring-[#2F6FED]/25',
	secondary:
		'border border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-500 focus:border-slate-400 focus:ring-2 focus:ring-slate-300',
	tertiary:
		'border border-transparent bg-slate-100 text-slate-900 placeholder:text-slate-500 focus:border-slate-300 focus:ring-2 focus:ring-slate-300/60',
}

const sizeClasses: Record<InputSize, string> = {
	sm: 'h-9 text-sm px-3',
	md: 'h-11 text-sm px-3.5',
	lg: 'h-12 text-base px-4',
}

const iconPaddingBySize: Record<InputSize, string> = {
	sm: 'pl-9',
	md: 'pl-10',
	lg: 'pl-11',
}

const rightIconPaddingBySize: Record<InputSize, string> = {
	sm: 'pr-9',
	md: 'pr-10',
	lg: 'pr-11',
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className,
			variant = 'primary',
			size = 'md',
			loading = false,
			disabled = false,
			fullWidth = false,
			leftIcon,
			rightIcon,
			maxWidth,
			type = 'text',
			...props
		},
		ref
	) => {
		const isDisabled = disabled || loading

		return (
			<div
				className={[
					'relative flex items-center',
					fullWidth ? 'w-full' : 'w-auto',
				].join(' ')}
				style={maxWidth ? { maxWidth: `${maxWidth}px` } : undefined}
			>
				{leftIcon ? (
					<span className="pointer-events-none absolute left-3 z-10 inline-flex items-center text-slate-400">
						{leftIcon}
					</span>
				) : null}

				<input
					ref={ref}
					type={type}
					disabled={isDisabled}
					aria-busy={loading}
					className={[
						'w-full rounded-xl outline-none transition-all duration-200',
						'disabled:cursor-not-allowed disabled:opacity-60',
						variantClasses[variant],
						sizeClasses[size],
						leftIcon ? iconPaddingBySize[size] : '',
						rightIcon || loading ? rightIconPaddingBySize[size] : '',
						className ?? '',
					]
						.filter(Boolean)
						.join(' ')}
					{...props}
				/>

				{loading ? (
					<span
						aria-hidden="true"
						className="pointer-events-none absolute right-3 inline-flex h-4 w-4 animate-spin rounded-full border-2 border-[#2F6FED]/40 border-t-[#2F6FED]"
					/>
				) : rightIcon ? (
					<span className="pointer-events-none absolute right-3 inline-flex items-center text-slate-400">
						{rightIcon}
					</span>
				) : null}
			</div>
		)
	}
)

Input.displayName = 'Input'

export default Input
