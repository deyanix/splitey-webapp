import {
	Avatar,
	Badge,
	Button,
	Checkbox,
	Divider,
	Dropdown,
	Input,
	InputNumber,
	List,
	Menu,
	message,
	PageHeader,
	Space,
	Typography,
} from 'antd';
import FriendService from 'src/api/Friend/FriendService';
import { useCallback, useEffect, useState, useTransition } from 'react';
import { Friend, FriendInvitation } from 'src/api/Friend/FriendModels';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppAvatar from 'src/components/AppAvatar/AppAvatar';
import {
	faCheck,
	faClose,
	faEllipsisVertical,
	faEnvelope,
	faPen,
	faPerson,
	faSearch,
	faTrash,
	faUser,
	faUserGroup,
	faUsers,
} from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import UserListItemMeta from 'src/components/UserListItemMeta/UserListItemMeta';
import AddFriendDropdown from 'src/pages/Friend/Friends/AddFriendDropdown';
import { Link } from 'react-router-dom';

export default function () {
	const { t } = useTranslation();

	const [loading, setLoading] = useState<boolean>(true);
	const [friends, setFriends] = useState<Friend[]>([]);

	useEffect(() => {
		reload();
	}, []);

	const reload = useCallback(async () => {
		setLoading(true);
		try {
			setFriends(await FriendService.getFriends());
		} finally {
			setLoading(false);
		}
	}, []);

	const deleteFriend = useCallback(async (friend: Friend) => {
		setLoading(true);
		try {
			if (_.isNumber(friend.userId)) {
				await FriendService.deleteUserFriend(friend.userId);
			}
			if (_.isNumber(friend.externalFriendId)) {
				await FriendService.deleteExternalFriend(
					friend.externalFriendId
				);
			}
			message.info(t('successfullyDeletedFriend'));
			await reload();
		} finally {
			setLoading(false);
		}
	}, []);

	return (
		<PageHeader
			title={t('friends')}
			extra={
				<>
					<Badge count={0} offset={[-4, 6]}>
						<Link to="/friends/invitations">
							<Button
								icon={<FontAwesomeIcon icon={faEnvelope} />}
								type="text"
							/>
						</Link>
					</Badge>
					<AddFriendDropdown />
				</>
			}
		>
			<Input
				placeholder={t('searchFriends')}
				prefix={<FontAwesomeIcon icon={faSearch} />}
				style={{ marginBottom: 16 }}
			/>
			<List
				loading={loading}
				dataSource={friends}
				renderItem={(item) => (
					<List.Item key={`e${item.externalFriendId}u${item.userId}`}>
						<UserListItemMeta person={item} />
						<Dropdown
							trigger={['click']}
							overlay={
								<Menu
									items={[
										{
											key: 'edit',
											label: t('edit'),
											icon: (
												<FontAwesomeIcon icon={faPen} />
											),
										},
										{
											key: 'delete',
											label: t('delete'),
											icon: (
												<FontAwesomeIcon
													icon={faTrash}
												/>
											),
											danger: true,
											onClick: () => deleteFriend(item),
										},
									]}
								/>
							}
						>
							<Button type="text" shape="circle">
								<FontAwesomeIcon icon={faEllipsisVertical} />
							</Button>
						</Dropdown>
					</List.Item>
				)}
			/>
		</PageHeader>
	);
}
