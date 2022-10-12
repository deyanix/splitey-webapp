import api from '../index';
import { CurrentUser, User } from './UserModels';

export default {
	async searchUsers(name: string): Promise<User[]> {
		return (await api.get('/users', { params: { name } })).data;
	},
	async getCurrent(): Promise<CurrentUser> {
		return (await api.get('/users/current')).data;
	},
};
