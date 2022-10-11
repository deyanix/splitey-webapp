import api from '../index';
import { AuthenticationResult, LoginData } from './AuthModels';

export default {
	async login(data: LoginData): Promise<AuthenticationResult> {
		return (await api.post('/auth/login', data)).data;
	},
	async refresh(refreshToken: string): Promise<AuthenticationResult> {
		return (await api.post('/auth/refresh', { refreshToken })).data;
	},
	async invalidate(refreshToken: string): Promise<void> {
		return (await api.post('/auth/invalidate', { refreshToken })).data;
	},
};
