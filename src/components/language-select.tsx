import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Props {
	currentLocale: string;
	currentPath: string;
	className?: string;
}

const locales = [
	{ code: "fr", label: "Français" },
	{ code: "en", label: "English" },
	{ code: "es", label: "Español" },
];

export function LanguageSelect({ currentLocale, currentPath, className }: Props) {
	const [selectedLocale, setSelectedLocale] = useState(currentLocale);

	const handleChange = (value: string) => {
		setSelectedLocale(value);
		const pathWithoutLocale = currentPath.replace(/^\/(en|es)/, "");
		const newPath = value === "fr" ? pathWithoutLocale : `/${value}${pathWithoutLocale}`;
		setTimeout(() => {
			window.location.href = newPath || "/";
		}, 1);
	};

	return (
		<div className={cn("w-28", className)}>
			<Select value={selectedLocale} onValueChange={handleChange}>
				<SelectTrigger className="w-full border-0 bg-primary-foreground text-white rounded-md hover:bg-white/10 focus-visible:ring-0 focus-visible:border-0">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{locales.map((locale) => (
						<SelectItem key={locale.code} value={locale.code} className="py-3">
							{locale.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
