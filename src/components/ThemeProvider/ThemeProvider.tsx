import React, { useState } from 'react';
import { Themes, ThemeType } from '../../themes';
import Loading from '../Loading/Loading';

export interface ThemeConsumer {
	theme: ThemeType;
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

export const ThemeProvider: React.FC = (props) => {
	const [theme, setTheme] = useState<ThemeType>(getOsTheme());
	const [loading, setLoading] = useState<boolean>(false);
	const ThemeComponent = Themes[theme];

	return (
		<ThemeContext.Provider
			value={{
				theme,
				setTheme,
			}}
		>
			<ThemeComponent />
			{props.children}
		</ThemeContext.Provider>
	);
};
