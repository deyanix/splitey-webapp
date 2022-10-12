import { useCallback } from 'react';
import _ from 'lodash';
import { ThemeType } from 'src/themes';

export const THEME_KEY = 'splitey_theme';

export default function () {
	const setStoredTheme = useCallback((result: ThemeType): void => {
		localStorage.setItem(THEME_KEY, result);
	}, []);

	const getStoredTheme = useCallback((): ThemeType | undefined => {
		const resultString = localStorage.getItem(THEME_KEY);
		return !_.isNil(resultString) ? (resultString as ThemeType) : undefined;
	}, []);

	const clearStoredTheme = useCallback((): void => {
		localStorage.removeItem(THEME_KEY);
	}, []);

	return {
		setStoredTheme,
		getStoredTheme,
		clearStoredTheme,
	};
}
