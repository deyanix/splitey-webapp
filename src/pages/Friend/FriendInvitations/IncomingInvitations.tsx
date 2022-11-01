import React, { useCallback, useEffect, useState } from 'react';
import { Button, List, message, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons';
import { FriendInvitation } from 'src/api/Friend/FriendModels';
import FriendService from 'src/api/Friend/FriendService';
import { useTranslation } from 'react-i18next';
import IndividualItemMeta from 'src/components/Individual/IndividualItemMeta';
import { mapUserToIndividual } from 'src/components/Individual/IndividualUtilities';

export const IncomingInvitations: React.FC = () => {
	const { t } = useTranslation();
	const [invitations, setInvitations] = useState<FriendInvitation[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		void reload();
	}, []);

	const reload = useCallback(async () => {
		setLoading(true);
		try {
			setInvitations(await FriendService.getInvitations());
		} catch {
			message.error(t('genericError'));
		} finally {
			setLoading(false);
		}
	}, []);

	const acceptInvitation = useCallback(
		async (invitation: FriendInvitation) => {
			setLoading(true);
			try {
				await FriendService.acceptInvitation(invitation.id);
				message.info(t('successfullyAcceptedInvitation'));
				await reload();
			} catch {
				message.error(t('genericError'));
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
				await FriendService.declineInvitation(invitation.id);
				message.info(t('successfullyDeclinedInvitation'));
				await reload();
			} catch {
				message.error(t('genericError'));
			} finally {
				setLoading(false);
			}
		},
		[]
	);

	return (
		<List
			loading={loading}
			dataSource={invitations}
			renderItem={(item) => (
				<List.Item key={item.id}>
					<IndividualItemMeta
						individual={mapUserToIndividual(item.sender)}
					/>
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
	);
};
