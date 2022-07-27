import { Button, Card, Select } from 'antd';
import SpliteyLogo from '../../assets/splitey_black_logo.svg';
import { Outlet } from 'react-router-dom';
import { ThemeContext } from '../../components/ThemeProvider/ThemeProvider';
import { ThemeType } from '../../themes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

export default function () {
	return (
		<div className="authentication-layout">
			<div className="authentication-layout">
				<SpliteyLogo className="authentication-layout-logo" />
				<Card className="authentication-layout-content">
					<Outlet />
				</Card>

				<div className="authentication-layout-footer">
					<Select defaultValue="lucy" bordered={false}>
						<Select.Option value="jack">Polski</Select.Option>
						<Select.Option value="lucy">English</Select.Option>
						<Select.Option value="Yiminghe">Deutsche</Select.Option>
					</Select>
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
