import { Button } from '@/components/ui/button'
import langs from '@/i18n/langs'
import type { I18n } from '@/i18n/translations'
import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

interface Props {
	locale: I18n
	apiBaseUrl: string
}

const fieldClasses =
	'h-12 w-full rounded-2xl bg-secondary/20 px-5 text-sm text-foreground placeholder:text-foreground/60 outline-none focus-visible:ring-2 focus-visible:ring-secondary transition-[box-shadow]'

export function ContactForm({ locale, apiBaseUrl }: Props) {
	const [status, setStatus] = useState<Status>('idle')
	const [form, setForm] = useState({ name: '', firstname: '', email: '', mobile: '', message: '' })
	const t = langs[locale]

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setStatus('loading')
		try {
			const res = await fetch(`${apiBaseUrl}/api/contact`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(form)
			})
			if (res.ok) {
				setStatus('success')
				setForm({ name: '', firstname: '', email: '', mobile: '', message: '' })
			} else {
				setStatus('error')
			}
		} catch {
			setStatus('error')
		}
	}

	return (
		<div className="relative">
			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
					<input
						type="text"
						name="name"
						required
						value={form.name}
						onChange={handleChange}
						placeholder={t.NOM}
						className={fieldClasses}
					/>
					<input
						type="text"
						name="firstname"
						required
						value={form.firstname}
						onChange={handleChange}
						placeholder={t.PRENOM}
						className={fieldClasses}
					/>
					<input
						type="email"
						name="email"
						required
						value={form.email}
						onChange={handleChange}
						placeholder={t.ADRESSE_EMAIL}
						className={fieldClasses}
					/>
					<input
						type="tel"
						name="mobile"
						required
						value={form.mobile}
						onChange={handleChange}
						placeholder={t.NUMERO_TELEPHONE}
						className={fieldClasses}
					/>
				</div>
				<textarea
					name="message"
					required
					rows={6}
					value={form.message}
					onChange={handleChange}
					placeholder={t.VOTRE_MESSAGE}
					className={`${fieldClasses} h-auto resize-none py-4`}
				/>
				<Button
					type="submit"
					variant="secondary"
					size="xl"
					disabled={status === 'loading'}
					className="mt-2 w-fit rounded-xl"
				>
					{t.ENVOYER}
				</Button>
			</form>
			{(status === 'success' || status === 'error') && (
				<p
					className={`absolute -bottom-7 left-0 text-sm font-medium ${
						status === 'error' ? 'text-destructive' : 'text-secondary'
					}`}
				>
					{status === 'error' ? t.CONTACT_ERREUR : t.CONTACT_SUCCES}
				</p>
			)}
		</div>
	)
}
