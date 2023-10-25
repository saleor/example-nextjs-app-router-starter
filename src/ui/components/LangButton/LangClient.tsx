// Assuming 'client' is a type or something specific you might want to handle accordingly
"use client";

import { uTranslation } from "../../../i18n/client";
import { labels } from "../../../i18n/settings";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LngButtonProps {
	lng: string;
}

export const LngButton: React.FC<LngButtonProps> = ({ lng }) => {
	const { t } = uTranslation(lng);
	const path = usePathname();

	const getLink = (label: string): string => {
		const reg = new RegExp(Object.keys(labels).join("|"));
		const np = path.replace(reg, label);
		return np;
	};

	return (
		<>
			<p>{t("switch")}</p>
			{Object.keys(labels).map((label) => (
				<Link key={label} href={getLink(label)}>
					<button disabled={lng === label}>{labels[label]}</button>
				</Link>
			))}
		</>
	);
};
