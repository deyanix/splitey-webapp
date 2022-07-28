import React, { useEffect, useRef, useState } from 'react';
import './Preloader.less';
import SpliteySpinner from '../SpliteySpinner/SpliteySpinner';
import { ThemeContext } from '../ThemeProvider/ThemeProvider';
import { ThemeType } from '../../themes';

export interface PreloaderProps {
	theme?: ThemeType;
	showing: boolean;
}

export type PreloaderStatus = 'ENTERING' | 'ENTERED' | 'EXITING' | 'EXITED';

const Preloader: React.FC<PreloaderProps> = (props) => {
	const [status, setStatus] = useState<PreloaderStatus>('EXITED');
	const loadingRef = useRef<HTMLDivElement>(null);

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
		<ThemeContext.Consumer>
			{({ theme }) => (
				<div
					ref={loadingRef}
					className={[
						'preloader',
						'preloader--' + props.theme ?? theme,
						'preloader--' + status.toLowerCase(),
					].join(' ')}
					onTransitionEnd={onTransitionEnd}
				>
					<div className="preloader__spinner">
						<SpliteySpinner />
					</div>
				</div>
			)}
		</ThemeContext.Consumer>
	);
};

export default Preloader;
