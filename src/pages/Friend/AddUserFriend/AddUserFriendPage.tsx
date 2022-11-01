import { Input, PageHeader } from 'antd/es';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import _ from 'lodash';
import { User } from 'src/api/User/UserModels';
import { List, message } from 'antd';
import { AddUserItem } from 'src/pages/Friend/AddUserFriend/AddUserItem';
import FriendService from 'src/api/Friend/FriendService';
import { UserRelation, UserWithRelation } from 'src/api/Friend/FriendModels';

export default function () {
	const { t } = useTranslation();
	const [name, setName] = useState<string>('');
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(false);
	const [users, setUsers] = useState<UserWithRelation[]>([]);

	const fetchUsers = useCallback(async (name: string) => {
		setLoading(true);
		try {
			setUsers(await FriendService.searchUsers(name));
		} catch {
			message.error(t('genericError'));
		} finally {
			setLoading(false);
		}
	}, []);

	const fetchUsersWithDebounce = useMemo(() => {
		return _.debounce(fetchUsers, 400);
	}, [fetchUsers]);

	const handleChangeName = useCallback(
		(evt: ChangeEvent<HTMLInputElement>) => {
			const name = evt.currentTarget.value;
			setName(name);
			fetchUsersWithDebounce(name);
		},
		[]
	);

	const handleAcceptInvitation = useCallback(
		async (relation: UserRelation) => {
			const invitationId = relation.receivedInvitationId;
			if (_.isNil(invitationId)) {
				return;
			}

			setLoading(true);
			try {
				await FriendService.acceptInvitation(invitationId);
				message.info(t('successfullyAcceptedInvitation'));
				await fetchUsers(name);
			} catch {
				message.error(t('genericError'));
			} finally {
				setLoading(false);
			}
		},
		[name]
	);

	const handleDeclineInvitation = useCallback(
		async (relation: UserRelation) => {
			const invitationId = relation.receivedInvitationId;
			if (_.isNil(invitationId)) {
				return;
			}

			setLoading(true);
			try {
				await FriendService.declineInvitation(invitationId);
				message.info(t('successfullyDeclinedInvitation'));
				await fetchUsers(name);
			} catch {
				message.error(t('genericError'));
			} finally {
				setLoading(false);
			}
		},
		[name]
	);

	const handleCancelInvitation = useCallback(
		async (relation: UserRelation) => {
			const invitationId = relation.sentInvitationId;
			if (_.isNil(invitationId)) {
				return;
			}

			setLoading(true);
			try {
				await FriendService.cancelInvitation(invitationId);
				message.info(t('cancelledInvitation'));
				await fetchUsers(name);
			} catch {
				message.error(t('genericError'));
			} finally {
				setLoading(false);
			}
		},
		[name]
	);

	const handleInvite = useCallback(
		async (user: User) => {
			setLoading(true);
			try {
				await FriendService.createInvitations(user.id);
				message.info(t('successfullyInvited'));
				await fetchUsers(name);
			} catch {
				message.error(t('genericError'));
			} finally {
				setLoading(false);
			}
		},
		[name]
	);

	return (
		<PageHeader title={t('addFriend')} onBack={() => navigate('/friends')}>
			<Input
				value={name}
				onChange={handleChangeName}
				placeholder={t('searchFriends')}
				prefix={<FontAwesomeIcon icon={faSearch} />}
				style={{ marginBottom: 16 }}
			/>
			<List
				loading={loading}
				dataSource={users}
				renderItem={(user) => (
					<AddUserItem
						user={user}
						onAcceptInvitation={() =>
							handleAcceptInvitation(user.relation)
						}
						onDeclineInvitation={() =>
							handleDeclineInvitation(user.relation)
						}
						onCancelInvitation={() =>
							handleCancelInvitation(user.relation)
						}
						onInvite={() => handleInvite(user.user)}
					/>
				)}
			/>
		</PageHeader>
	);
}
