import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
	currentLocale: string;
	currentPath: string;
}

const locales = [
	{ code: "fr", label: "Français" },
	{ code: "en", label: "English" },
	{ code: "es", label: "Español" },
];

export function LanguageSelect({ currentLocale, currentPath }: Props) {
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
		<div className="w-32">
			<Select value={selectedLocale} onValueChange={handleChange}>
				<SelectTrigger className="!h-full w-full border-0  bg-gray-100 rounded-none">
					<SelectValue />
				</SelectTrigger>
				<SelectContent className="bg-white">
					{locales.map((locale) => (
						<SelectItem key={locale.code} value={locale.code} className="py-3 [&_svg]:text-primary focus:bg-primary focus:text-primary-foreground focus:[&_svg]:text-primary-foreground">
							{locale.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
