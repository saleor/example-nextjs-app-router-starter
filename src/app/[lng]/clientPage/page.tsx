import Link from "next/link";
import { LngButton } from "../../../ui/components/LangButton/LangClient";
import { uTranslation } from "../../../i18n/client";

interface ClientProps {
	params: {
		lng: string;
	};
}

const Client: React.FC<ClientProps> = ({ params: { lng } }) => {
	const { t } = uTranslation(lng, "main");

	return (
		<main>
			<h1>{lng}</h1>
			<Link href={`/${lng}`}>back</Link>
			<br />
			<LngButton lng={lng} />
			<br />
			{/* Multilingual sample */}
			<p>{t("hello")}</p>
			<p>{t("hello", { lng: "ja" })}</p>
			<p>{t("auth.login")}</p>
			{/* Substitution */}
			<p>{t("name", { fn: "Tanaka", ln: "Taro" })}</p>
			{/* Plural */}
			<p>{t("comment", { count: 0 })}</p>
			<p>{t("comment", { count: 1 })}</p>
			<p>{t("comment", { count: 100 })}</p>
			{/* Context */}
			<p>{t("comment", { context: "good", count: 20 })}</p>
		</main>
	);
};

export default Client;
