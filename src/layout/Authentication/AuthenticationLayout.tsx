import { Button, Card, Select } from 'antd';
import SpliteyLogo from '../../assets/splitey_black_logo.svg';
import { Outlet } from 'react-router-dom';
import { ThemeContext } from '../../components/ThemeProvider/ThemeProvider';
import { ThemeType } from '../../themes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import LanguageSelect from './LanguageSelect';

export default function () {
	return (
		<div className="authentication-layout">
			<div className="authentication-layout__container">
				<SpliteyLogo className="authentication-layout__logo" />
				<Card className="authentication-layout__content">
					<Outlet />
				</Card>

				<div className="authentication-layout__footer">
					<LanguageSelect />
					<ThemeContext.Consumer>
						{({ theme, setTheme }) => (
							<>
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
							</>
						)}
					</ThemeContext.Consumer>
				</div>
			</div>
		</div>
	);
}
