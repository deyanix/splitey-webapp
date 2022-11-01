import React from 'react';
import { Button, List, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCheck,
	faClose,
	faRotateLeft,
	faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { UserWithRelation } from 'src/api/Friend/FriendModels';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons/faUserCheck';
import _ from 'lodash';
import IndividualItemMeta from 'src/components/Individual/IndividualItemMeta';
import { mapUserToIndividual } from 'src/components/Individual/IndividualUtilities';

export interface AddUserItemProps {
	user: UserWithRelation;
	onAcceptInvitation?: () => void;
	onDeclineInvitation?: () => void;
	onInvite?: () => void;
	onCancelInvitation?: () => void;
}

export const AddUserItem: React.FC<AddUserItemProps> = (props) => {
	const { t } = useTranslation();

	const renderButton = () => {
		const relation = props.user.relation;
		if (relation.isFriend) {
			return <FontAwesomeIcon icon={faUserCheck} />;
		}
		if (!_.isNil(relation.sentInvitationId)) {
			return (
				<Button
					icon={<FontAwesomeIcon icon={faRotateLeft} />}
					type="text"
					shape="circle"
					onClick={() => props.onCancelInvitation?.()}
				/>
			);
		}
		if (!_.isNil(relation.receivedInvitationId)) {
			return (
				<>
					<Button
						icon={<FontAwesomeIcon icon={faCheck} />}
						type="text"
						shape="circle"
						onClick={() => props.onAcceptInvitation?.()}
					/>
					<Button
						icon={<FontAwesomeIcon icon={faClose} />}
						type="text"
						shape="circle"
						onClick={() => props.onDeclineInvitation?.()}
					/>
				</>
			);
		}

		return (
			<Button
				icon={<FontAwesomeIcon icon={faUserPlus} />}
				type="text"
				shape="circle"
				onClick={() => props.onInvite?.()}
			/>
		);
	};

	return (
		<List.Item key={props.user.user.id}>
			<IndividualItemMeta
				individual={mapUserToIndividual(props.user.user)}
			/>
			<Space>{renderButton()}</Space>
		</List.Item>
	);
};
