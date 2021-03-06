import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import translations from './translations';

export default i18next
	.use(I18nextBrowserLanguageDetector)
	.use(initReactI18next)
	.init({
		load: 'all',
		fallbackLng: 'en',
		debug: true,
		resources: translations,
		supportedLngs: Object.keys(translations),
		whitelist: ['en', 'pl'],
		ns: ['authentication'],
	});
