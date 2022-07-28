import React, { useEffect, useState } from 'react';
import {
	changeBodyTheme,
	getOsTheme,
	loadTheme,
	ThemeType,
} from '../../themes';
import Preloader from '../Preloader/Preloader';

export interface ThemeConsumer {
	theme?: ThemeType;
	setTheme: (theme: ThemeType) => void;
}

export const ThemeContext = React.createContext<ThemeConsumer>({
	theme: ThemeType.LIGHT,
	setTheme: () => {},
});

export const ThemeProvider: React.FC = (props) => {
	const [theme, setTheme] = useState<ThemeType | undefined>();
	const [pendingTheme, setPendingTheme] = useState<ThemeType | undefined>(
		getOsTheme()
	);

	useEffect(() => {
		if (pendingTheme === undefined) {
			return;
		}

		const loadPromise = loadTheme(pendingTheme);
		setTimeout(() => {
			loadPromise
				.then(() => {
					setTheme(pendingTheme);
					changeBodyTheme(pendingTheme);
				})
				.finally(() => setPendingTheme(undefined));
		}, 500);
	}, [pendingTheme]);

	return (
		<ThemeContext.Provider
			value={{
				theme,
				setTheme: setPendingTheme,
			}}
		>
			<Preloader theme={pendingTheme ?? theme} showing={!!pendingTheme} />
			{props.children}
		</ThemeContext.Provider>
	);
};
