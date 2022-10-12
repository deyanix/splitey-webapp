import { hot } from 'react-hot-loader/root';
import React, { useCallback, useEffect, useState } from 'react';
import { AppRouter } from 'src/router';
import './i18n';
import { ThemeProvider } from 'src/components/ThemeProvider/ThemeProvider';
import { CurrentUserProvider } from 'src/components/CurrentUserContext/CurrentUserProvider';
import { ConfigProvider } from 'antd';
import { useTranslation } from 'react-i18next';
import locales from 'src/i18n/locales';

const App = () => {
	const { i18n } = useTranslation();
	const [antdLocale, setAntdLocale] = useState(locales['en'].antdLocale);

	useEffect(() => {
		handleLanguageChange(i18n.language);
		i18n.on('languageChanged', handleLanguageChange);
		return () => i18n.off('languageChanged', handleLanguageChange);
	}, []);

	const handleLanguageChange = useCallback((lng: string) => {
		console.log('lange', lng);
		setAntdLocale(locales[lng].antdLocale);
	}, []);

	return (
		<ConfigProvider locale={antdLocale}>
			<ThemeProvider>
				<CurrentUserProvider>
					<AppRouter />
				</CurrentUserProvider>
			</ThemeProvider>
		</ConfigProvider>
	);
};

export default hot(App);
