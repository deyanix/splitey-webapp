import { Button, Card } from 'antd';
import SpliteyLogo from '../../assets/splitey_black_logo.svg';
import { Outlet, useLocation } from 'react-router-dom';
import { ThemeType } from 'src/themes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import LanguageSelect from './LanguageSelect';
import { useTheme } from 'src/components/ThemeProvider/ThemeContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useState } from 'react';

export interface AuthenticationOutletContext {
	width: number;
	setWidth: (val: number) => void;
}

export default function () {
	const { theme, setTheme } = useTheme();
	const location = useLocation();
	const [width, setWidth] = useState<number>(320);

	return (
		<div className="authentication-layout">
			<div className="authentication-layout__container">
				<SpliteyLogo className="authentication-layout__logo" />
				<div
					className="authentication-layout__card-wrapper"
					style={{ maxWidth: width }}
				>
					<Card className="authentication-layout__card">
						<TransitionGroup exit={false}>
							<CSSTransition
								timeout={300}
								key={location.pathname}
								classNames="authentication-layout__page"
								unmountOnExit
							>
								<Outlet context={{ width, setWidth }} />
							</CSSTransition>
						</TransitionGroup>
					</Card>
					<div className="authentication-layout__footer">
						<LanguageSelect />
						<Button
							type="text"
							shape="circle"
							icon={
								<FontAwesomeIcon
									icon={
										theme === ThemeType.DARK
											? faMoon
											: faSun
									}
								/>
							}
							onClick={() =>
								setTheme(
									theme === ThemeType.DARK
										? ThemeType.LIGHT
										: ThemeType.DARK
								)
							}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
