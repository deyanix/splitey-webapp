import { User } from 'src/api/User/UserModels';

export interface Friend {
	externalFriendId: number | null;
	userId: number | null;
	firstName: string;
	lastName: string;
	username: string;
}

export interface ExternalFriend {
	id: number;
	firstName: string;
	lastName: string;
}

export type CreateExternalFriend = Omit<ExternalFriend, 'id'>;

export type UpdateExternalFriend = CreateExternalFriend;

export interface FriendInvitation {
	id: number;
	date: Date;
	active: boolean;
	seen: boolean;
	sender: User;
}

export interface UserWithRelation {
	user: User;
	relation: UserRelation;
}

export interface UserRelation {
	isFriend: boolean;
	sentInvitationId: number | null;
	receivedInvitationId: number | null;
}
