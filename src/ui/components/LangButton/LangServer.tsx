import Link from "next/link";
import { FC, ReactElement, useState, useEffect } from "react";
import { sTranslation } from "../../../i18n/server";
import { i18n as I18nInstance, TFunction } from "i18next";
import { labels } from "../../../i18n/settings";

interface LngButtonProps {
	lng: string;
}

export const LangServer: FC<LngButtonProps> = ({ lng }): ReactElement => {
	const [t, setT] = useState<TFunction | null>(null);

	useEffect(() => {
		let isMounted = true;

		const fetchTranslation = async () => {
			const translation: { t: TFunction; i18n: I18nInstance } = await sTranslation(lng, "main");
			if (isMounted) {
				setT(translation.t);
			}
		};

		void fetchTranslation();

		return () => {
			isMounted = false;
		};
	}, [lng]);

	return (
		<>
			{/* <p>{t("switch")}</p> */}
			<p>{t ? t("switch") : ""}</p>
			{Object.keys(labels).map((label) => (
				<Link key={label} href={`/${label}`}>
					<button disabled={lng === label}>{labels[label]}</button>
				</Link>
			))}
		</>
	);
};
