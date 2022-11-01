import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import locales from './locales';
import { setDefaultOptions } from 'date-fns';
import _ from 'lodash';

i18next.on('languageChanged', (lng) => {
	document.documentElement.setAttribute('lang', lng);
	setDefaultOptions({
		locale: locales[lng].dateFnsLocale,
	});
});

export default i18next
	.use(I18nextBrowserLanguageDetector)
	.use(initReactI18next)
	.init({
		load: 'all',
		fallbackLng: 'en',
		resources: _.chain(locales)
			.toPairs()
			.map(([key, locale]) => [key, locale.translations])
			.fromPairs()
			.value(),
		supportedLngs: _.keys(locales),
		defaultNS: 'common',
	});
