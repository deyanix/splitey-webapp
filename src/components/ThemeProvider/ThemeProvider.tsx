import React, { useEffect, useRef, useState } from 'react';
import { changeBodyTheme, getOsTheme, loadTheme, ThemeType } from 'src/themes';
import Preloader from '../Preloader/Preloader';
import { ThemeContext } from './ThemeContext';
import useStoredTheme from 'src/hooks/useStoredTheme';

export const ThemeProvider: React.FC<React.PropsWithChildren> = (props) => {
	const { getStoredTheme, setStoredTheme } = useStoredTheme();
	const [theme, setTheme] = useState<ThemeType | undefined>();
	const [pendingTheme, setPendingTheme] = useState<ThemeType | undefined>(
		getStoredTheme() ?? getOsTheme()
	);
	const nextLoaderId = useRef<number>(0);
	const loaders = useRef<number[]>([]);
	const [showingLoader, setShowingLoader] = useState<boolean>(false);

	useEffect(() => {
		if (pendingTheme === undefined) {
			return;
		}

		const loaderId = showLoader();
		const loadPromise = loadTheme(pendingTheme);
		setTimeout(() => {
			loadPromise
				.then(() => {
					setStoredTheme(pendingTheme);
					setTheme(pendingTheme);
					changeBodyTheme(pendingTheme);
				})
				.finally(() => {
					setPendingTheme(undefined);
					hideLoader(loaderId);
				});
		}, 500);
	}, [pendingTheme]);

	const showLoader = (): number => {
		const id = nextLoaderId.current++;
		loaders.current.push(id);

		setShowingLoader(true);
		return id;
	};

	const hideLoader = (id: number) => {
		loaders.current = loaders.current.filter((loaderId) => loaderId !== id);
		setShowingLoader(loaders.current.length > 0);
	};

	return (
		<ThemeContext.Provider
			value={{
				theme,
				pendingTheme,
				showLoader,
				hideLoader,
				setTheme: setPendingTheme,
			}}
		>
			<Preloader showing={showingLoader} />
			{props.children}
		</ThemeContext.Provider>
	);
};
