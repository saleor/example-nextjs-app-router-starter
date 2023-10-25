export const fallbackLng = "ja";
export const languages: string[] = [fallbackLng, "en"];
export const defaultNS = "main";

interface LabelsType {
	ja: string;
	en: string;
	[key: string]: string;
}

export const labels: LabelsType = {
	ja: "日本語",
	en: "English",
};

export function getOptions(
	lng: string = fallbackLng,
	ns: string = defaultNS,
): {
	supportedLngs: string[];
	fallbackLng: string;
	lng: string;
	fallbackNS: string;
	defaultNS: string;
	ns: string;
} {
	return {
		// debug: true,
		supportedLngs: languages,
		fallbackLng,
		lng,
		fallbackNS: defaultNS,
		defaultNS,
		ns,
	};
}
