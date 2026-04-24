import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import langs from '@/i18n/langs'
import type { I18n } from '@/i18n/translations'
import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

interface Props {
	locale: I18n
	variant?: 'default' | 'footer'
	apiBaseUrl: string
}

export function NewsletterForm({ locale, variant = 'default', apiBaseUrl }: Props) {
	const [status, setStatus] = useState<Status>('idle')
	const [email, setEmail] = useState('')
	const t = langs[locale]

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!email) {
			return
		}
		setStatus('loading')
		try {
			const res = await fetch(`${apiBaseUrl}/api/newsletter`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email })
			})
			if (res.ok) {
				setStatus('success')
			} else {
				setStatus('error')
			}
		} catch {
			setStatus('error')
		}
	}

	const isFooter = variant === 'footer'

	return (
		<div className="relative">
			<form onSubmit={handleSubmit} className="flex flex-col items-stretch gap-4 lg:flex-row lg:items-center">
				<Input
					type="email"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className={'h-14 w-full rounded-xl bg-white text-black lg:rounded-r-none'}
					placeholder={t.EMAIL_PLACEHOLDER}
				/>
				<Button
					type="submit"
					variant={'secondary'}
					size={isFooter ? 'xl' : 'xl'}
					disabled={status === 'loading'}
					className="h-14 rounded-xl lg:w-auto lg:rounded-l-none"
				>
					{t.NEWSLETTER_BOUTON}
				</Button>
			</form>
			{(status === 'success' || status === 'error') && (
				<p
					className={`absolute -top-6 left-0 text-sm font-medium ${status === 'error' ? 'text-destructive' : 'text-secondary'}`}
				>
					{status === 'error' ? t.NEWSLETTER_ERREUR : t.NEWSLETTER_SUCCES}
				</p>
			)}
		</div>
	)
}
