import React from 'react';
import { Button, List, Space } from 'antd';
import UserListItemMeta from 'src/components/UserListItemMeta/UserListItemMeta';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCheck,
	faClose,
	faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { UserWithRelation } from 'src/api/Friend/FriendModels';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons/faUserCheck';
import _ from 'lodash';

export interface AddUserItemProps {
	user: UserWithRelation;
	onAcceptInvitation?: () => unknown;
	onDeclineInvitation?: () => unknown;
	onInvite?: () => unknown;
}

export const AddUserItem: React.FC<AddUserItemProps> = (props) => {
	const { t } = useTranslation();

	const renderButton = () => {
		const relation = props.user.relation;
		if (relation.isFriend) {
			return (
				<Button
					icon={<FontAwesomeIcon icon={faUserCheck} />}
					type="primary"
					disabled={true}
				/>
			);
		}
		if (!_.isNil(relation.sentInvitationId)) {
			return (
				<Button
					icon={<FontAwesomeIcon icon={faUserPlus} />}
					type="primary"
					disabled={true}
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
				type="primary"
				onClick={() => props.onInvite?.()}
			/>
		);
	};

	return (
		<List.Item key={props.user.user.id}>
			<UserListItemMeta person={props.user.user} />
			<Space>{renderButton()}</Space>
		</List.Item>
	);
};
