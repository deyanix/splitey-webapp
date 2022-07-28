import React, { useEffect, useState } from 'react';
import { ThemeType } from '../../themes';
import Preloader from '../Preloader/Preloader';
import themeLight from '../../themes/light/light.less?theme';
import themeDark from '../../themes/dark/dark.less?theme';

export interface ThemeConsumer {
	theme?: ThemeType;
	setTheme: (theme: ThemeType) => void;
}

export const ThemeContext = React.createContext<ThemeConsumer>({
	theme: ThemeType.LIGHT,
	setTheme: () => {},
});

export function isOsDarkMode(): boolean {
	return (
		window.matchMedia &&
		window.matchMedia('(prefers-color-scheme: dark)').matches
	);
}

export function getOsTheme(): ThemeType {
	return isOsDarkMode() ? ThemeType.DARK : ThemeType.LIGHT;
}

export function loadTheme(path: string): Promise<void> {
	return new Promise((resolve, reject) => {
		const oldTheme = document.querySelector('link#theme-stylesheet');
		const link = document.createElement('link');
		link.href = path;
		link.id = 'theme-stylesheet';
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.onload = () => {
			oldTheme?.remove();
			resolve();
		};
		link.onerror = () => {
			reject();
		};
		document.head.append(link);
	});
}

export function changeBodyTheme(targetTheme: ThemeType | undefined): void {
	const bodyClassList = document.body.classList;
	const oldThemeClasses = Array.from(bodyClassList.values()).filter(
		(className) => className.startsWith('theme--')
	);
	bodyClassList.remove(...oldThemeClasses);
	bodyClassList.add('theme--' + targetTheme);
}

export const ThemeProvider: React.FC = (props) => {
	const [theme, setTheme] = useState<ThemeType | undefined>();
	const [pendingTheme, setPendingTheme] = useState<ThemeType | undefined>(
		getOsTheme()
	);

	useEffect(() => {
		if (pendingTheme === undefined) {
			return;
		}

		const themePath = pendingTheme === 'dark' ? themeDark : themeLight;
		const loadPromise = loadTheme(themePath);
		setTimeout(() => {
			loadPromise
				.then(() => {
					setTheme(pendingTheme);
					changeBodyTheme(pendingTheme);
				})
				.finally(() => setPendingTheme(undefined));
		}, 2000);
	}, [pendingTheme]);

	return (
		<ThemeContext.Provider
			value={{
				theme,
				setTheme: setPendingTheme,
			}}
		>
			{pendingTheme && <Preloader theme={pendingTheme} />}
			{props.children}
		</ThemeContext.Provider>
	);
};
