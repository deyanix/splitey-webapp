import {
	Avatar,
	Breadcrumb,
	Button,
	Dropdown,
	Layout,
	Menu,
	Space,
} from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons/faArrowRightFromBracket';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import { faAddressBook } from '@fortawesome/free-solid-svg-icons/faAddressBook';
import SpliteyLogo from '../../assets/splitey_black_icon.svg';

const menu = (
	<Menu
		items={[
			{
				key: '3',
				label: (
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://www.aliyun.com"
					>
						Contacts
					</a>
				),
				icon: <FontAwesomeIcon icon={faAddressBook} />,
			},
			{
				key: '1',
				label: (
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://www.aliyun.com"
					>
						Settings
					</a>
				),
				icon: <FontAwesomeIcon icon={faGear} />,
			},
			{
				type: 'divider', // Must have
			},
			{
				key: '2',
				label: (
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://www.aliyun.com"
					>
						Log out
					</a>
				),
				icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
			},
		]}
	/>
);

const MainLayout: React.FC = () => {
	return (
		<Layout className="main-layout">
			<Layout.Header
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
				}}
			>
				<SpliteyLogo />
				<Dropdown
					overlay={menu}
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
			<Layout.Content style={{ padding: '0 24px' }}>
				<Breadcrumb style={{ margin: '16px 0' }}>
					<Breadcrumb.Item>Home</Breadcrumb.Item>
					<Breadcrumb.Item>List</Breadcrumb.Item>
					<Breadcrumb.Item>App</Breadcrumb.Item>
				</Breadcrumb>
				<div className="site-layout-content">
					<Outlet />
				</div>
			</Layout.Content>
			<Layout.Footer style={{ textAlign: 'center' }}>
				Ant Design ©2018 Created by Ant UED
			</Layout.Footer>
		</Layout>
	);
};

export default MainLayout;
