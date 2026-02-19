import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { I18n } from "@/i18n/translations";
import langs from "@/i18n/langs";

type Status = "idle" | "loading" | "success" | "error";

interface Props {
	locale: I18n;
	variant?: "default" | "footer";
	apiBaseUrl: string;
}

export function NewsletterForm({ locale, variant = "default", apiBaseUrl }: Props) {
	const [status, setStatus] = useState<Status>("idle");
	const [email, setEmail] = useState("");
	const t = langs[locale];

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!email) {
			return;
		}
		setStatus("loading");
		try {
			const res = await fetch(`${apiBaseUrl}/api/newsletter`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});
			if (res.ok) {
				setStatus("success");
			} else {
				setStatus("error");
			}
		} catch {
			setStatus("error");
		}
	};

	const isFooter = variant === "footer";

	return (
		<div className="relative">
			<form onSubmit={handleSubmit} className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
				<Input
					type="email"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className={isFooter ? "h-12 w-full border-none bg-white text-black" : "bg-secondary-muted/40 h-12 w-full border-none"}
					placeholder={t.EMAIL_PLACEHOLDER}
				/>
				<Button
					type="submit"
					variant={isFooter ? "secondary" : "default"}
					size={isFooter ? "xl" : "xl"}
					disabled={status === "loading"}
					className="lg:w-auto"
				>
					{t.NEWSLETTER_BOUTON}
				</Button>
			</form>
			{(status === "success" || status === "error") && (
				<p className={`absolute left-0 -top-6 text-sm font-medium ${status === "error" ? "text-destructive" : "text-secondary"}`}>
					{status === "error" ? t.NEWSLETTER_ERREUR : t.NEWSLETTER_SUCCES}
				</p>
			)}
		</div>
	);
}
