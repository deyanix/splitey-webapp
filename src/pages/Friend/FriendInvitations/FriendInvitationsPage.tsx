import { useCallback, useEffect, useState } from 'react';
import { FriendInvitation } from 'src/api/Friend/FriendModels';
import { useTranslation } from 'react-i18next';
import FriendService from 'src/api/Friend/FriendService';
import { Button, List, PageHeader, Space } from 'antd';
import UserListItemMeta from 'src/components/UserListItemMeta/UserListItemMeta';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons';
import AddFriendDropdown from 'src/pages/Friend/Friends/AddFriendDropdown';
import { useNavigate } from 'react-router-dom';

export default function () {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const [invitations, setInvitations] = useState<FriendInvitation[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		reload();
	}, []);

	const reload = useCallback(async () => {
		setLoading(true);
		try {
			setInvitations(await FriendService.getInvitations());
		} finally {
			setLoading(false);
		}
	}, []);

	const acceptInvitation = useCallback(
		async (invitation: FriendInvitation) => {
			setLoading(true);
			try {
				await FriendService.acceptInvitation(invitation.id);
				await reload();
			} finally {
				setLoading(false);
			}
		},
		[]
	);

	const declineInvitation = useCallback(
		async (invitation: FriendInvitation) => {
			setLoading(true);
			try {
				await FriendService.acceptInvitation(invitation.id);
				await reload();
			} finally {
				setLoading(false);
			}
		},
		[]
	);

	return (
		<PageHeader
			title={t('invitations')}
			onBack={() => navigate('/friends')}
		>
			<List
				loading={loading}
				dataSource={invitations}
				renderItem={(item) => (
					<List.Item key={item.id}>
						<UserListItemMeta person={item.sender} />
						<Space>
							<Button
								icon={<FontAwesomeIcon icon={faCheck} />}
								type="text"
								shape="circle"
								onClick={() => acceptInvitation(item)}
							/>
							<Button
								icon={<FontAwesomeIcon icon={faClose} />}
								type="text"
								shape="circle"
								onClick={() => declineInvitation(item)}
							/>
						</Space>
					</List.Item>
				)}
			/>
		</PageHeader>
	);
}
