import { ThemeType } from '../../themes';
import React from 'react';

export interface ThemeConsumer {
	theme?: ThemeType;
	setTheme: (theme: ThemeType) => void;
}

export const ThemeContext = React.createContext<ThemeConsumer>({
	theme: ThemeType.LIGHT,
	setTheme: () => {},
});

export function useTheme(): ThemeConsumer {
	return React.useContext(ThemeContext);
}
