import { ThemeType } from 'src/themes';
import React from 'react';

export interface ThemeConsumer {
	theme?: ThemeType;
	pendingTheme?: ThemeType;
	setTheme: (theme: ThemeType) => void;
	showLoader: () => number;
	hideLoader: (id: number) => void;
}

export const ThemeContext = React.createContext<ThemeConsumer>({
	theme: undefined,
	pendingTheme: undefined,
	setTheme: () => {},
	showLoader: () => -1,
	hideLoader: () => {},
});

export function useTheme(): ThemeConsumer {
	return React.useContext(ThemeContext);
}
