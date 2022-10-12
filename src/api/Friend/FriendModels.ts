import { User } from 'src/api/User/UserModels';

export interface Friend {
	externalFriendId: number | null;
	userId: number | null;
	firstName: string;
	lastName: string;
	username: string;
}

export interface FriendInvitation {
	id: number;
	date: Date;
	active: boolean;
	seen: boolean;
	sender: User;
}
