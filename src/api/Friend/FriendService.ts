import api from 'src/api';
import {
	CreateExternalFriend,
	ExternalFriend,
	Friend,
	FriendInvitation,
	UpdateExternalFriend,
	UserWithRelation,
} from 'src/api/Friend/FriendModels';

export default {
	async getFriends(): Promise<Friend[]> {
		return (await api.get('/friends')).data;
	},
	async deleteUserFriend(id: number): Promise<void> {
		await api.delete(`/friends/users/${id}`);
	},
	async getExternalFriend(id: number): Promise<ExternalFriend> {
		return (await api.get(`/friends/external/${id}`)).data;
	},
	async createExternalFriend(data: CreateExternalFriend): Promise<void> {
		await api.post('/friends/external', data);
	},
	async updateExternalFriend(
		id: number,
		data: UpdateExternalFriend
	): Promise<void> {
		await api.put(`/friends/external/${id}`, data);
	},
	async deleteExternalFriend(id: number): Promise<void> {
		await api.delete(`/friends/external/${id}`);
	},
	async getInvitations(): Promise<FriendInvitation[]> {
		return (await api.get('/friends/invitations')).data;
	},
	async getSentInvitations(): Promise<FriendInvitation[]> {
		return (await api.get('/friends/invitations/sent')).data;
	},
	async createInvitations(recipientId: number): Promise<void> {
		await api.post(`/friends/invitations`, { recipientId });
	},
	async acceptInvitation(id: number): Promise<void> {
		await api.post(`/friends/invitations/${id}/accept`);
	},
	async declineInvitation(id: number): Promise<void> {
		await api.post(`/friends/invitations/${id}/decline`);
	},
	async cancelInvitation(id: number): Promise<void> {
		await api.post(`/friends/invitations/${id}/cancel`);
	},
	async searchUsers(name: string): Promise<UserWithRelation[]> {
		return (await api.get('/friends/users', { params: { name } })).data;
	},
};
