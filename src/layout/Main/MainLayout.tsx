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
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons/faArrowRightFromBracket';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons/faAddressBook';
import SpliteyLogo from '../../assets/splitey_black_logo.svg';
import { faMoon, faWallet } from '@fortawesome/free-solid-svg-icons';

type MenuItem = Required<MenuProps>['items'][number];

const profileMenu: MenuItem[] = [
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
		key: '2',
		label: <a href="#">Log out</a>,
		icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
	},
];

const siderMenu: MenuItem[] = [
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
];

const MainLayout: React.FC = () => {
	const [collapsed, setCollapsed] = useState(false);

	return (
		<Layout className="main-layout">
			<Layout.Header
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				{' '}
				<SpliteyLogo className="main-layout__logo" />
				<Dropdown
					overlay={<Menu items={profileMenu} />}
					trigger={['click']}
					placement="bottomRight"
				>
					<Button danger type="text" className="avatar-dropdown">
						<Space>
							<Avatar>M</Avatar>
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
						Ant Design ©2018 Created by Ant UED
					</Layout.Footer>
				</Layout>
			</Layout>
		</Layout>
	);
};

export default MainLayout;
