import api from 'src/api';
import { Friend, FriendInvitation } from 'src/api/Friend/FriendModels';

export default {
	async getFriends(): Promise<Friend[]> {
		return (await api.get('/friends')).data;
	},
	async deleteUserFriend(id: number): Promise<void> {
		await api.delete(`/friends/user/${id}`);
	},
	async deleteExternalFriend(id: number): Promise<void> {
		await api.delete(`/friends/external/${id}`);
	},
	async getInvitations(): Promise<FriendInvitation[]> {
		return (await api.get('/friends/invitations')).data;
	},
	async acceptInvitation(id: number): Promise<void> {
		await api.post(`/friends/invitations/${id}/accept`);
	},
	async declineInvitation(id: number): Promise<void> {
		await api.post(`/friends/invitations/${id}/decline`);
	},
};
