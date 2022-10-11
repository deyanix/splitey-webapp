import { Button, Card } from 'antd';
import SpliteyLogo from '../../assets/splitey_black_logo.svg';
import { Outlet, useLocation } from 'react-router-dom';
import { ThemeType } from '../../themes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import LanguageSelect from './LanguageSelect';
import { useTheme } from '../../components/ThemeProvider/ThemeContext';
import {
	CSSTransition,
	SwitchTransition,
	TransitionGroup,
} from 'react-transition-group';

export default function () {
	const { theme, setTheme } = useTheme();
	const location = useLocation();

	return (
		<div className="authentication-layout">
			<div className="authentication-layout__container">
				<SpliteyLogo className="authentication-layout__logo" />
				<div className="authentication-layout__card-wrapper">
					<Card className="authentication-layout__card">
						<TransitionGroup component={null} exit={false}>
							<CSSTransition
								timeout={300}
								key={location.pathname}
								classNames="page"
								unmountOnExit
							>
								<Outlet />
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
