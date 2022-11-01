import React, { useCallback, useEffect, useState } from 'react';
import { Button, List, message, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCheck,
	faClose,
	faRotateLeft,
} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { FriendInvitation } from 'src/api/Friend/FriendModels';
import FriendService from 'src/api/Friend/FriendService';
import IndividualItemMeta from 'src/components/Individual/IndividualItemMeta';
import { mapUserToIndividual } from 'src/components/Individual/IndividualUtilities';

export const OutgoingInvitations: React.FC = () => {
	const { t } = useTranslation();
	const [invitations, setInvitations] = useState<FriendInvitation[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		void reload();
	}, []);

	const reload = useCallback(async () => {
		setLoading(true);
		try {
			setInvitations(await FriendService.getSentInvitations());
		} catch {
			message.error(t('genericError'));
		} finally {
			setLoading(false);
		}
	}, []);

	const handleCancelInvitation = useCallback(
		async (invitation: FriendInvitation) => {
			setLoading(true);
			try {
				await FriendService.cancelInvitation(invitation.id);
				message.info(t('cancelledInvitation'));
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
						individual={mapUserToIndividual(item.recipient)}
					/>
					<Space>
						<Button
							icon={<FontAwesomeIcon icon={faRotateLeft} />}
							type="text"
							shape="circle"
							onClick={() => handleCancelInvitation(item)}
						/>
					</Space>
				</List.Item>
			)}
		/>
	);
};
