import themeLight from './styles/light.less?theme';
import themeDark from './styles/dark.less?theme';

export enum ThemeType {
	DARK = 'dark',
	LIGHT = 'light',
}

export function getThemePath(theme: ThemeType): string {
	switch (theme) {
		case ThemeType.LIGHT:
			return themeLight;
		case ThemeType.DARK:
			return themeDark;
	}
}

export function isOsDarkMode(): boolean {
	return (
		window.matchMedia &&
		window.matchMedia('(prefers-color-scheme: dark)').matches
	);
}

export function getOsTheme(): ThemeType {
	return isOsDarkMode() ? ThemeType.DARK : ThemeType.LIGHT;
}

export function loadTheme(theme: ThemeType): Promise<void> {
	return new Promise((resolve, reject) => {
		const oldTheme = document.querySelector('link#theme-stylesheet');
		const link = document.createElement('link');
		link.href = getThemePath(theme);
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
