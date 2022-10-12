import React, { useEffect, useState } from 'react';
import './ThemeLoader.less';
import SpliteySpinner from '../SpliteySpinner/SpliteySpinner';
import { ThemeType } from 'src/themes';
import { useTheme } from '../ThemeProvider/ThemeContext';

export interface PreloaderProps {
	theme?: ThemeType;
	showing: boolean;
}

export type PreloaderStatus = 'ENTERING' | 'ENTERED' | 'EXITING' | 'EXITED';

const ThemeLoader: React.FC<PreloaderProps> = (props) => {
	const [status, setStatus] = useState<PreloaderStatus>('EXITED');
	const { theme, pendingTheme } = useTheme();

	useEffect(() => {
		if (props.showing) {
			setStatus('ENTERING');
		} else {
			setStatus('EXITING');
			const timeout = setTimeout(() => {
				setStatus('EXITED');
			}, 1000);
			return () => {
				clearTimeout(timeout);
			};
		}
	}, [props.showing]);

	const onTransitionEnd = (event: React.TransitionEvent) => {
		if (event.propertyName === 'opacity') {
			switch (status) {
				case 'ENTERING':
					setStatus('ENTERED');
					break;
				case 'EXITING':
					setStatus('EXITED');
					break;
			}
		}
	};

	if (status === 'EXITED') {
		return <></>;
	}

	return (
		<div
			className={[
				'theme-loader',
				'theme-loader--' + (props.theme ?? pendingTheme ?? theme),
				'theme-loader--' + status.toLowerCase(),
			].join(' ')}
			onTransitionEnd={onTransitionEnd}
		>
			<div className="preloader__spinner">
				<SpliteySpinner />
			</div>
		</div>
	);
};

export default ThemeLoader;
