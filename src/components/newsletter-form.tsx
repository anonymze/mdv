import { useEffect, useState } from "react";
import { getCookie, setCookie } from "@/lib/cookies";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { I18n } from "@/i18n/translations";
import langs from "@/i18n/langs";

type Status = "idle" | "loading" | "success" | "error" | "subscribed";

interface Props {
	locale: I18n;
	variant?: "default" | "footer";
}

export function NewsletterForm({ locale, variant = "default" }: Props) {
	const [status, setStatus] = useState<Status>("idle");
	const [email, setEmail] = useState("");
	const t = langs[locale];

	useEffect(() => {
		if (getCookie("newsletter_subscribed")) {
			setStatus("subscribed");
		}
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!email) {
			return;
		}
		setStatus("loading");
		try {
			const res = await fetch("/api/newsletter", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});
			if (res.ok) {
				setCookie("newsletter_subscribed", "true", 365);
				setStatus("success");
			} else {
				setStatus("error");
			}
		} catch {
			setStatus("error");
		}
	};

	const isFooter = variant === "footer";
	const showForm = status !== "subscribed" && status !== "success";

	return (
		<div className="relative">
			<form onSubmit={handleSubmit} className={isFooter ? "flex flex-col gap-2" : "flex items-center gap-4"} style={{ visibility: showForm ? "visible" : "hidden" }}>
				<Input
					type="email"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className={isFooter ? "h-10 border-white/20 bg-white/10 text-white placeholder:text-white/60" : "bg-secondary-muted/40 h-12 w-full border-none"}
					placeholder={t.EMAIL_PLACEHOLDER}
				/>
				<Button
					type="submit"
					size={isFooter ? "default" : "xl"}
					disabled={status === "loading"}
				>
					{status === "loading" ? "..." : t.NEWSLETTER_BOUTON}
				</Button>
			</form>
			{(status === "subscribed" || status === "success" || status === "error") && (
				<p className={`absolute left-0 -top-6 text-sm font-medium ${status === "error" ? "text-destructive" : isFooter ? "text-primary-foreground" : "text-secondary"}`}>
					{status === "error" ? t.NEWSLETTER_ERREUR : status === "success" ? t.NEWSLETTER_SUCCES : t.NEWSLETTER_DEJA_INSCRIT}
				</p>
			)}
		</div>
	);
}
