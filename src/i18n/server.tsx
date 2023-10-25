import { createInstance, i18n as I18nInstance, TFunction } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { getOptions } from "./settings";

const initI18next = async (lng: string, ns: string): Promise<I18nInstance> => {
	const i18nInstance = createInstance();
	await i18nInstance
		.use(initReactI18next)
		.use(
			resourcesToBackend(
				(language: string, namespace: string) => import(`./languages/${language}/${namespace}.json`),
			),
		)
		.init(getOptions(lng, ns));
	return i18nInstance;
};

export async function sTranslation(lng: string, ns: string): Promise<{ t: TFunction; i18n: I18nInstance }> {
	const i18nextInstance = await initI18next(lng, ns);
	return {
		t: i18nextInstance.getFixedT(lng, ns),
		i18n: i18nextInstance,
	};
}
