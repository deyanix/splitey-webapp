import api from '../index';
import { CurrentUser } from './UserModels';

export default {
	async getCurrent(): Promise<CurrentUser> {
		return (await api.get('/user')).data;
	},
};
