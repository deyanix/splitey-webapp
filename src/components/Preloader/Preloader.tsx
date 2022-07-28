import React, { Ref, useRef } from 'react';
import './Preloader.less';
import SpliteyLoading from '../SpliteyLoading/SpliteyLoading';
import { ThemeContext } from '../ThemeProvider/ThemeProvider';
import { ThemeType } from '../../themes';

export interface PreloaderProps {
	theme?: ThemeType;
	showing?: boolean;
}

const Preloader: React.FC<PreloaderProps> = (props) => {
	const loadingRef = useRef<HTMLDivElement>(null);
	const showing: boolean = props.showing === undefined ? true : props.showing;
	if (!showing) {
		return <></>;
	}

	return (
		<ThemeContext.Consumer>
			{({ theme }) => (
				<div
					ref={loadingRef}
					className={
						'loading-backdrop loading-backdrop-' + props.theme ??
						theme
					}
				>
					<div className="loading">
						<SpliteyLoading />
					</div>
				</div>
			)}
		</ThemeContext.Consumer>
	);
};

export default Preloader;
