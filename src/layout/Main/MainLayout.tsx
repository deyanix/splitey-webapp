import { Button, Drawer, Dropdown, Layout, Menu, Space } from 'antd';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons/faArrowRightFromBracket';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import SpliteyLogo from '../../assets/splitey_black_logo.svg';
import {
	faBars,
	faMoon,
	faSun,
	faUserGroup,
	faWallet,
} from '@fortawesome/free-solid-svg-icons';
import { useCurrentUser } from 'src/components/CurrentUserContext/CurrentUserContext';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { useTheme } from 'src/components/ThemeProvider/ThemeContext';
import { ThemeType } from 'src/themes';
import { useTranslation } from 'react-i18next';
import { useResizeDetector } from 'react-resize-detector';
import IndividualAvatar from 'src/components/Individual/IndividualAvatar';
import { mapUserToIndividual } from 'src/components/Individual/IndividualUtilities';

const MainLayout: React.FC = () => {
	const { t } = useTranslation();
	const { theme, setTheme } = useTheme();
	const { user, logout } = useCurrentUser();
	const { showLoader, hideLoader } = useTheme();
	const [collapsed, setCollapsed] = useState(false);
	const [mobileDrawer, setMobileDrawer] = useState<boolean>(false);
	const lastWidth = useRef<number>();
	const location = useLocation();

	const handleResize = useCallback((width?: number) => {
		if (!width) {
			return;
		}

		const lastWidthPx = lastWidth.current ?? width;
		if (width < 560 && lastWidthPx >= 560) {
			setCollapsed(true);
		}
		if (width > 560 && lastWidthPx <= 560) {
			setCollapsed(false);
		}
		setMobileDrawer(width < 560);
		lastWidth.current = width;
	}, []);

	const { ref } = useResizeDetector({ onResize: handleResize });

	const handleChangeTheme = useCallback(() => {
		setTheme(theme === ThemeType.DARK ? ThemeType.LIGHT : ThemeType.DARK);
	}, [theme]);

	const handleLogoutClick = useCallback(async () => {
		const loaderId = showLoader();
		try {
			await logout();
		} finally {
			hideLoader(loaderId);
		}
	}, []);

	const profileMenu = useMemo<ItemType[]>(
		() => [
			{
				key: 'theme',
				label: theme === ThemeType.DARK ? 'Dark' : 'Light',
				icon: (
					<FontAwesomeIcon
						icon={theme === ThemeType.DARK ? faMoon : faSun}
					/>
				),
				onClick: handleChangeTheme,
			},
			{
				key: 'settings',
				label: <a href="#">Settings</a>,
				icon: <FontAwesomeIcon icon={faGear} />,
			},
			{
				type: 'divider',
			},
			{
				key: 'logout',
				label: 'Log out',
				icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
				onClick: handleLogoutClick,
			},
		],
		[theme]
	);

	const siderMenu = useMemo<ItemType[]>(
		() => [
			{
				key: '/settlements',
				label: <Link to="/settlements">{t('settlements')}</Link>,
				icon: <FontAwesomeIcon icon={faWallet} />,
			},
			{
				key: '/friends',
				label: <Link to="/friends">{t('friends')}</Link>,
				icon: <FontAwesomeIcon icon={faUserGroup} />,
			},
		],
		[]
	);

	return (
		<Layout ref={ref} className="main-layout">
			<Layout.Header
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
					}}
				>
					<Button
						icon={<FontAwesomeIcon icon={faBars} />}
						onClick={() => setCollapsed(!collapsed)}
					/>
					<SpliteyLogo
						className="main-layout__logo"
						style={{ marginLeft: 16 }}
					/>
				</div>
				<Dropdown
					overlay={<Menu items={profileMenu} />}
					trigger={['click']}
					placement="bottomRight"
				>
					<Button danger type="text" className="avatar-dropdown">
						<Space>
							<IndividualAvatar
								individual={
									user ? mapUserToIndividual(user) : undefined
								}
							/>
							<FontAwesomeIcon
								icon={faChevronDown}
								color="white"
							/>
						</Space>
					</Button>
				</Dropdown>
			</Layout.Header>
			<Layout>
				<Layout.Sider
					className="main-layout__sider"
					collapsible
					collapsed={collapsed}
					onCollapse={setCollapsed}
					trigger={null}
					style={{ display: mobileDrawer ? 'none' : 'block' }}
				>
					<Menu
						selectedKeys={[location.pathname]}
						mode="inline"
						items={siderMenu}
					/>
				</Layout.Sider>
				{mobileDrawer && (
					<Drawer
						className="main-layout__drawer"
						open={!collapsed}
						placement="left"
						onClose={() => setCollapsed(true)}
					>
						<Menu
							selectedKeys={[location.pathname]}
							mode="inline"
							items={siderMenu}
						/>
					</Drawer>
				)}
				<Layout>
					<Layout.Content style={{ padding: '16px 24px' }}>
						<div className="main-layout__content">
							<Outlet />
						</div>
					</Layout.Content>
					<Layout.Footer style={{ textAlign: 'center' }}>
						Splitey by deyanix
					</Layout.Footer>
				</Layout>
			</Layout>
		</Layout>
	);
};

export default MainLayout;
