import {
	Avatar,
	Breadcrumb,
	Button,
	Dropdown,
	Layout,
	Menu,
	MenuProps,
	Space,
} from 'antd';
import React, { useCallback, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons/faArrowRightFromBracket';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons/faAddressBook';
import SpliteyLogo from '../../assets/splitey_black_logo.svg';
import { faMoon, faWallet } from '@fortawesome/free-solid-svg-icons';
import { useCurrentUser } from 'src/components/CurrentUserContext/CurrentUserContext';
import { ItemType } from 'antd/lib/menu/hooks/useItems';

const MainLayout: React.FC = () => {
	const { user, logout } = useCurrentUser();
	const [collapsed, setCollapsed] = useState(false);

	const handleProfileMenuClick = useCallback((key: string) => {
		switch (key) {
			case 'logout':
				logout();
				break;
		}
	}, []);

	const profileMenu = useMemo<ItemType[]>(
		() => [
			{
				key: '3',
				label: <a href="#">Dark</a>,
				icon: <FontAwesomeIcon icon={faMoon} />,
			},
			{
				key: '1',
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
				onClick: () => logout,
			},
		],
		[]
	);

	const siderMenu = useMemo<ItemType[]>(
		() => [
			{
				key: '3',
				label: <a href="#">Settlement</a>,
				icon: <FontAwesomeIcon icon={faWallet} />,
			},
			{
				key: '1',
				label: <a href="#">Contacts</a>,
				icon: <FontAwesomeIcon icon={faAddressBook} />,
			},
		],
		[]
	);

	return (
		<Layout className="main-layout">
			<Layout.Header
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<SpliteyLogo className="main-layout__logo" />
				<Dropdown
					overlay={
						<Menu
							items={profileMenu}
							onClick={({ key }) => handleProfileMenuClick(key)}
						/>
					}
					trigger={['click']}
					placement="bottomRight"
				>
					<Button danger type="text" className="avatar-dropdown">
						<Space>
							<Avatar>{user?.firstName.at(0)}</Avatar>
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
					collapsedWidth="0"
					trigger={null}
					collapsible
					collapsed={collapsed}
					onCollapse={setCollapsed}
				>
					<Menu
						theme="dark"
						defaultSelectedKeys={['1']}
						mode="inline"
						items={siderMenu}
					/>
				</Layout.Sider>
				<Layout>
					<Layout.Content style={{ padding: '0 24px' }}>
						<Breadcrumb style={{ margin: '16px 0' }}>
							<Breadcrumb.Item>Home</Breadcrumb.Item>
							<Breadcrumb.Item>List</Breadcrumb.Item>
							<Breadcrumb.Item>App</Breadcrumb.Item>
						</Breadcrumb>
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
