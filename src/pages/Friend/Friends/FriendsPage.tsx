import {
	Badge,
	Button,
	Dropdown,
	Input,
	List,
	Menu,
	message,
	PageHeader,
} from 'antd';
import FriendService from 'src/api/Friend/FriendService';
import { useCallback, useEffect, useState } from 'react';
import { Friend } from 'src/api/Friend/FriendModels';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faEllipsisVertical,
	faEnvelope,
	faPen,
	faSearch,
	faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import AddFriendDropdown from 'src/pages/Friend/Friends/AddFriendDropdown';
import { Link } from 'react-router-dom';
import IndividualItemMeta from 'src/components/Individual/IndividualItemMeta';
import { IndividualType } from 'src/components/Individual/IndividualModels';

export default function () {
	const { t } = useTranslation();

	const [loading, setLoading] = useState<boolean>(true);
	const [friends, setFriends] = useState<Friend[]>([]);

	useEffect(() => {
		void reload();
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
			if (friend.type === IndividualType.USER) {
				await FriendService.deleteUserFriend(friend.id);
			} else if (friend.type === IndividualType.EXTERNAL_FRIEND) {
				await FriendService.deleteExternalFriend(friend.id);
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
					<List.Item key={`${item.type}${item.id}`}>
						<IndividualItemMeta individual={item} />
						<Dropdown
							trigger={['click']}
							overlay={
								<Menu
									items={[
										{
											key: 'edit',
											label: (
												<Link
													to={`/friends/${item.id}/edit`}
												>
													{t('edit')}
												</Link>
											),
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
