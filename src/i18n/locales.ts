import translationsEn from './translations/en';
import dateFnsEn from 'date-fns/locale/en-US';
import antdEn from 'antd/es/locale/en_US';
import translationsPl from './translations/pl';
import dateFnsPl from 'date-fns/locale/pl';
import antdPl from 'antd/es/locale/pl_PL';
import { Resource } from 'i18next';
import { Locale as AntdLocale } from 'antd/lib/locale-provider';
import { Locale as DateFnsLocale } from 'date-fns';

export interface AppLocale {
	translations: Resource;
	dateFnsLocale: DateFnsLocale;
	antdLocale: AntdLocale;
}

export default {
	en: {
		translations: translationsEn,
		dateFnsLocale: dateFnsEn,
		antdLocale: antdEn,
	},
	pl: {
		translations: translationsPl,
		dateFnsLocale: dateFnsPl,
		antdLocale: antdPl,
	},
} as Record<string, AppLocale>;
