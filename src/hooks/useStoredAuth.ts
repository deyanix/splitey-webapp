import _ from 'lodash';
import { AuthenticationResult } from 'src/api/Auth/AuthModels';

export const AUTHENTICATION_RESULT_KEY = 'splitey_authentication_result';
export type StoredAuthenticationResult = Partial<
	Omit<AuthenticationResult, 'accessToken'>
>;

export default function () {
	return {
		setStoredAuth(result: StoredAuthenticationResult): void {
			localStorage.setItem(
				AUTHENTICATION_RESULT_KEY,
				JSON.stringify(result)
			);
		},
		get storedAuth(): StoredAuthenticationResult | undefined {
			const resultString = localStorage.getItem(
				AUTHENTICATION_RESULT_KEY
			);
			return !_.isNil(resultString)
				? JSON.parse(resultString)
				: undefined;
		},
		clearStoredAuth(): void {
			localStorage.removeItem(AUTHENTICATION_RESULT_KEY);
		},
	};
}
