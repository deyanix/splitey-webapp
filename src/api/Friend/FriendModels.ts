import { User } from 'src/api/User/UserModels';
import { Individual } from 'src/components/Individual/IndividualModels';

export type Friend = Individual;

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
	recipient: User;
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
