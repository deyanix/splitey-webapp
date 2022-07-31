import React, { useEffect, useState } from 'react';
import {
	changeBodyTheme,
	getOsTheme,
	loadTheme,
	ThemeType,
} from '../../themes';
import Preloader from '../Preloader/Preloader';
import { ThemeContext } from './ThemeContext';

export const ThemeProvider: React.FC<React.PropsWithChildren> = (props) => {
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
