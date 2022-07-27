import React, { useEffect } from 'react';

export interface ThemeComponentProps {
	onLoading?: () => void;
	onLoaded?: () => void;
	onUnloaded?: () => void;
}

export function createThemeComponent(
	path: string
): React.FC<ThemeComponentProps> {
	return (props: ThemeComponentProps) => {
		useEffect(() => {
			props.onLoading?.();
			const link = document.createElement('link');
			link.href = path;
			link.rel = 'stylesheet';
			link.type = 'text/css';
			link.onload = () => {
				props.onLoaded?.();
			};
			document.head.append(link);
			return () => {
				link.remove();
				props.onUnloaded?.();
			};
		});
		return <></>;
	};
}

export enum ThemeType {
	DARK = 'dark',
	LIGHT = 'light',
}

export const LightTheme = React.lazy(() => import('./light/LightTheme'));
export const DarkTheme = React.lazy(() => import('./dark/DarkTheme'));

export const Themes = {
	[ThemeType.LIGHT]: LightTheme,
	[ThemeType.DARK]: DarkTheme,
};
